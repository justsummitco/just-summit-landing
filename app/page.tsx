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
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Just Summit</span>
              <p className="text-xs text-gray-600">AI Audio Learning</p>
            </div>
          </div>
          <nav className="nav">
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#specs" onClick={(e) => { e.preventDefault(); scrollToSection('specs'); }}>Specs</a>
            <a href="https://www.justsummit.co/blog" target="_blank" rel="noopener noreferrer">Blog</a>
            <a href="#story" onClick={(e) => { e.preventDefault(); scrollToSection('story'); }}>Our Story</a>
          </nav>
          <div className="support-link">
            <a href="mailto:hello@justsummit.co" className="email-support">
              <Mail className="w-4 h-4 mr-1" />
              Support
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="patent-badge">
            <Shield className="w-4 h-4 mr-1" />
            Patent Pending Technology
          </div>
          
          <h1 className="hero-title">
            World&apos;s First<br />
            <span className="gradient-text">On-device AI</span><br />
            Summarization Headphones
          </h1>
          
          <p className="hero-subtitle">
            Never miss important information again | Transform hours of audio into actionable insights | Patent Pending Technology
          </p>
          
          <div className="urgency-banner">
            <Clock className="w-4 h-4 mr-2" />
            <span>Early Bird Pricing: Save £100 - Limited Time Only</span>
          </div>

          {/* Email Capture */}
          <div className="email-capture">
            {!isSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="email-form">
                <input
                  type="email"
                  placeholder="Enter your email for exclusive early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
                <button type="submit" className="cta-button">
                  Get Early Access
                </button>
              </form>
            ) : (
              <div className="success-message">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <p>Welcome to the exclusive early access list!</p>
              </div>
            )}
            <p className="email-subtext">
              Join 1,000+ innovators securing their spot. Early bird pricing ends soon.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Privacy-First</span>
            </div>
            <div className="trust-item">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>On-Device Processing</span>
            </div>
            <div className="trust-item">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Patent Pending</span>
            </div>
          </div>

          {/* Product Showcase with Clean White Background */}
          <div className="product-showcase">
            <div className="product-hero-image">
              <img 
                src="/headphones-hero.png" 
                alt="Just Summit AI Headphones - Hero View"
                className="hero-product-image"
              />
              <div className="feature-badge left">
                <Brain className="w-4 h-4" />
                <span>AI Powered</span>
              </div>
              <div className="feature-badge right">
                <Battery className="w-4 h-4" />
                <span>All-day Battery*</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="video-showcase">
        <div className="container">
          <h2>See It In Action</h2>
          <p className="section-subtitle">Experience the future of audio intelligence</p>
          
          <div className="video-container">
            <video 
              src="/headphones-showcase.mp4" 
              controls 
              className="showcase-video"
              poster="/headphones-hero.png"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Pre-Order Section */}
      <section className="pre-order-section">
        <div className="container">
          <div className="pre-order-content">
            <div className="pre-order-text">
              <h2>Reserve Your AI Headphones</h2>
              <div className="urgency-indicator">
                <TrendingUp className="w-4 h-4 mr-2 text-orange-500" />
                <span className="text-orange-600 font-medium">Early Bird Special: Save £100 (Limited Time)</span>
              </div>
              <p className="pre-order-subtitle">
                Secure your spot with just £49 today. Pay the remaining £250 before shipping in Q2 2026.
              </p>
              
              <div className="pricing-breakdown">
                <div className="price-item">
                  <span className="price-label">Today:</span>
                  <span className="price-value">£49 deposit</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Before shipping:</span>
                  <span className="price-value">£250 balance</span>
                </div>
                <div className="price-item total">
                  <span className="price-label">Total:</span>
                  <span className="price-value">£299</span>
                </div>
              </div>

              <div className="pre-order-benefits">
                <div className="benefit-item">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>AI-powered audio summarization technology*</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Privacy-first on-device processing</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Memory-friendly ergonomic design</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Mobile app integration included</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support & product updates</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Full refund guarantee</span>
                </div>
              </div>

              <button onClick={handlePreOrder} className="pre-order-button">
                <CreditCard className="w-5 h-5 mr-2" />
                Pre-Order Now - £49 Deposit
              </button>

              <div className="security-note">
                <Lock className="w-4 h-4 text-gray-500" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>

            <div className="pre-order-image">
              <img 
                src="/headphones-side-view.png" 
                alt="Just Summit AI Headphones - Side View"
                className="side-view-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Revolutionary Features</h2>
          <p className="section-subtitle">Experience the future of audio intelligence with patent-pending technology</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3>AI Audio Summarization</h3>
              <p>Real-time summaries of podcasts, audiobooks, and meetings*</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <h3>Privacy-First Processing</h3>
              <p>On-device AI designed to keep your conversations private</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Battery className="w-8 h-8 text-blue-600" />
              </div>
              <h3>All-Day Intelligence</h3>
              <p>Extended battery life for continuous AI processing*</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Headphones className="w-8 h-8 text-blue-600" />
              </div>
              <h3>Memory-Friendly Design</h3>
              <p>Ergonomic comfort designed for extended focus sessions</p>
            </div>
          </div>

          {/* Features Image */}
          <div className="features-image-container">
            <img 
              src="/headphones-features.png" 
              alt="Just Summit AI Headphones - Features Breakdown"
              className="features-image"
            />
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="specs">
        <div className="container">
          <h2>Built for Your Lifestyle</h2>
          <p className="section-subtitle">Premium specs designed for real-world use</p>
          
          <div className="specs-grid">
            <div className="spec-item">
              <Battery className="w-8 h-8 text-blue-600 mb-2" />
              <div className="spec-number">All-day</div>
              <div className="spec-label">Battery Performance*</div>
            </div>
            <div className="spec-item">
              <Wifi className="w-8 h-8 text-blue-600 mb-2" />
              <div className="spec-number">Bluetooth 5.3</div>
              <div className="spec-label">Latest wireless technology</div>
            </div>
            <div className="spec-item">
              <Volume2 className="w-8 h-8 text-blue-600 mb-2" />
              <div className="spec-number">Premium Audio</div>
              <div className="spec-label">Crystal clear sound quality</div>
            </div>
          </div>
          
          <p className="specs-disclaimer">
            *Specifications subject to final testing and optimization. Battery performance varies with usage.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <h2>Join the Innovation</h2>
          <p className="section-subtitle">Be part of the audio revolution</p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <div className="stat-number">Be Among the First</div>
              <div className="stat-label">Founding Members</div>
            </div>
            <div className="stat-item">
              <Award className="w-8 h-8 text-blue-600 mb-2" />
              <div className="stat-number">95%</div>
              <div className="stat-label">Target accuracy rate*</div>
            </div>
            <div className="stat-item">
              <Clock className="w-8 h-8 text-blue-600 mb-2" />
              <div className="stat-number">Q2 2026</div>
              <div className="stat-label">Target delivery</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>&quot;Can&apos;t wait for this technology. Could be a game-changer for productivity.&quot;</p>
              </div>
              <div className="testimonial-author">
                <strong>Sarah M.</strong>
                <span>Product Manager</span>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>&quot;Excited about the privacy-first approach. Perfect for my needs.&quot;</p>
              </div>
              <div className="testimonial-author">
                <strong>Alex K.</strong>
                <span>Student</span>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>&quot;Innovative technology. Looking forward to being an early adopter.&quot;</p>
              </div>
              <div className="testimonial-author">
                <strong>Mike R.</strong>
                <span>Entrepreneur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="story">
        <div className="container">
          <h2>Born from Personal Need</h2>
          
          <div className="story-content">
            <p>After a brain injury left me struggling with memory, I discovered millions face similar challenges. Traditional tools failed us.</p>
            
            <p>So we built something different. Patent-pending technology that works with your brain, not against it.</p>
            
            <p>Everyone deserves tools that actually work.</p>
            
            <div className="story-link">
              <a href="/our-story" className="read-more-link">
                Read the Full Story <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="values">
            <div className="value-item">Memory-Friendly</div>
            <div className="value-item">ADHD-Tested</div>
            <div className="value-item">Accessibility-First</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Don&apos;t Miss Out on Revolutionary Audio Intelligence</h2>
          <p className="cta-subtitle">
            Join 1,000+ innovators who&apos;ve already secured their spot. Early bird pricing ends soon.
          </p>
          
          <div className="cta-buttons">
            <button onClick={handlePreOrder} className="pre-order-button large">
              <CreditCard className="w-5 h-5 mr-2" />
              Reserve Now - Only £49 Today
            </button>
            
            <div className="email-capture-final">
              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="email-form-inline">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="email-input-inline"
                  />
                  <button type="submit" className="cta-button-secondary">
                    Join Waitlist
                  </button>
                </form>
              ) : (
                <div className="success-message-inline">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>You&apos;re on the list!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <div className="container">
          <h2>Questions About Our AI Headphones?</h2>
          <p>We&apos;re here to help! Email us with any questions about features, shipping, or technical specifications.</p>
          
          <div className="support-cta">
            <a href="mailto:hello@justsummit.co" className="email-button">
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
          
          <p className="response-time">We respond to all emails within 24 hours</p>
          
          <div className="support-links">
            <a href="/faq" className="support-link">Common Questions</a>
            <a href="/learn-more" className="support-link">Learn More</a>
            <a href="/specs" className="support-link">Technical Specs</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JS</span>
                </div>
                <span className="text-lg font-bold text-white">Just Summit</span>
              </div>
              <p className="footer-description">
                World&apos;s first on-device AI summarization headphones
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <div className="footer-links">
                <a href="mailto:hello@justsummit.co">hello@justsummit.co</a>
                <p className="response-info">Response time: Within 24 hours</p>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://twitter.com/justsummit" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://linkedin.com/company/justsummit" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Just Summit. Patent Pending Technology.</p>
            <p className="disclaimer">
              All specifications subject to final testing and optimization. Delivery timeline is estimated and subject to change.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .App {
          min-height: 100vh;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 0;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav {
          display: flex;
          gap: 32px;
        }

        .nav a {
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav a:hover {
          color: #3b82f6;
        }

        .email-support {
          display: flex;
          align-items: center;
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
        }

        .patent-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .gradient-text {
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .email-capture {
          max-width: 500px;
          margin: 0 auto 32px;
        }

        .email-form {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        /* FIXED: Email input text color - now black instead of white */
        .email-input {
          flex: 1;
          padding: 16px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          color: #1f2937;
          background: white;
        }

        .cta-button {
          background: #f59e0b;
          color: white;
          border: none;
          padding: 16px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cta-button:hover {
          background: #d97706;
        }

        .email-subtext {
          font-size: 14px;
          opacity: 0.8;
        }

        .success-message {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(34, 197, 94, 0.2);
          padding: 16px;
          border-radius: 8px;
        }

        .trust-indicators {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 48px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .product-showcase {
          margin-top: 48px;
        }

        .product-hero-image {
          position: relative;
          display: inline-block;
          /* FIXED: Clean white background instead of dark gradient */
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .hero-product-image {
          max-width: 400px;
          width: 100%;
          height: auto;
        }

        .feature-badge {
          position: absolute;
          top: 20px;
          background: rgba(255, 255, 255, 0.95);
          color: #374151;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .feature-badge.left {
          left: 20px;
        }

        .feature-badge.right {
          right: 20px;
        }

        /* Video Showcase */
        .video-showcase {
          padding: 80px 0;
          text-align: center;
        }

        .video-showcase h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: #6b7280;
          margin-bottom: 48px;
        }

        .video-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .showcase-video {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        /* Pre-Order Section */
        .pre-order-section {
          background: #f9fafb;
          padding: 80px 0;
        }

        .pre-order-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .pre-order-text h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .pre-order-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 32px;
        }

        .pricing-breakdown {
          background: white;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 32px;
        }

        .price-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .price-item.total {
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
          font-weight: 600;
        }

        .price-value {
          font-weight: 600;
        }

        .pre-order-benefits {
          margin-bottom: 32px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .pre-order-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          margin-bottom: 16px;
        }

        .pre-order-button:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .security-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
        }

        .side-view-image {
          width: 100%;
          max-width: 400px;
        }

        /* Features */
        .features {
          padding: 80px 0;
          text-align: center;
        }

        .features h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .feature-card {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          margin-bottom: 16px;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .features-image {
          width: 100%;
          max-width: 600px;
          border-radius: 12px;
        }

        /* Specs */
        .specs {
          background: #f9fafb;
          padding: 80px 0;
          text-align: center;
        }

        .specs h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          margin-bottom: 32px;
        }

        .spec-item {
          text-align: center;
        }

        .spec-number {
          font-size: 2rem;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 8px;
        }

        .spec-label {
          color: #6b7280;
        }

        .specs-disclaimer {
          font-size: 14px;
          color: #6b7280;
          font-style: italic;
        }

        /* Social Proof */
        .social-proof {
          padding: 80px 0;
          text-align: center;
        }

        .social-proof h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #6b7280;
        }

        .testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .testimonial {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .testimonial-content {
          margin-bottom: 16px;
        }

        .testimonial-author {
          text-align: left;
        }

        .testimonial-author span {
          color: #6b7280;
          font-size: 14px;
        }

        /* Story */
        .story {
          background: #f9fafb;
          padding: 80px 0;
          text-align: center;
        }

        .story h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 32px;
        }

        .story-content {
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .story-content p {
          font-size: 1.125rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .read-more-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
        }

        .values {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .value-item {
          background: #3b82f6;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        /* Final CTA */
        .final-cta {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 80px 0;
          text-align: center;
        }

        .final-cta h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-subtitle {
          font-size: 1.25rem;
          margin-bottom: 48px;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .pre-order-button.large {
          font-size: 20px;
          padding: 20px 40px;
        }

        .email-form-inline {
          display: flex;
          gap: 12px;
        }

        /* FIXED: Inline email input text color - now black */
        .email-input-inline {
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          min-width: 250px;
          color: #1f2937;
          background: white;
        }

        .cta-button-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .success-message-inline {
          display: flex;
          align-items: center;
          background: rgba(34, 197, 94, 0.2);
          padding: 12px 24px;
          border-radius: 8px;
        }

        /* Support Section */
        .support-section {
          padding: 80px 0;
          text-align: center;
        }

        .support-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .support-section p {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 32px;
        }

        .email-button {
          background: #3b82f6;
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .response-time {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 32px;
        }

        .support-links {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .support-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        /* Footer */
        .footer {
          background: #1f2937;
          color: white;
          padding: 64px 0 32px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 48px;
          margin-bottom: 32px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .footer-description {
          color: #9ca3af;
        }

        .footer-section h4 {
          font-weight: 600;
          margin-bottom: 16px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links a {
          color: #9ca3af;
          text-decoration: none;
        }

        .response-info {
          font-size: 14px;
          color: #6b7280;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-links a {
          color: #9ca3af;
          text-decoration: none;
        }

        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 32px;
          text-align: center;
        }

        .disclaimer {
          font-size: 14px;
          color: #6b7280;
          font-style: italic;
          margin-top: 8px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .pre-order-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .email-form {
            flex-direction: column;
          }
          
          .trust-indicators {
            flex-direction: column;
            gap: 16px;
          }
          
          .nav {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

