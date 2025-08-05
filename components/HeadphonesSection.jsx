import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { CheckCircle, Headphones, Mic, Battery, Zap, Shield, Users } from 'lucide-react'
import StripeCheckout from './StripeCheckout.jsx'

const HeadphonesSection = () => {
  const [selectedTier, setSelectedTier] = useState('hardware')

  const pricingTiers = [
    {
      id: 'hardware',
      name: 'AI Headphones',
      price: '£299',
      description: 'Professional AI headphones with real-time transcription',
      features: [
        'Real-time AI transcription',
        'On-device processing (privacy-first)',
        'Professional-grade audio quality',
        '30-hour battery life',
        'Bluetooth 5.3 connectivity',
        'Mobile app included',
        'Basic meeting summaries'
      ],
      popular: false
    },
    {
      id: 'hardware_plus_pro',
      name: 'AI Headphones + Pro',
      price: '£399',
      description: 'Complete AI audio intelligence solution',
      features: [
        'Everything in AI Headphones',
        'Advanced AI summaries & insights',
        'Professional analytics dashboard',
        'Multi-language transcription',
        'Custom vocabulary training',
        'API access for integrations',
        'Priority customer support',
        '1 year Pro subscription included'
      ],
      popular: true
    }
  ]

  const keyFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy-First Design',
      description: 'All AI processing happens on-device. Your conversations never leave your headphones.'
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Real-time Transcription',
      description: 'Instant, accurate transcriptions of meetings, calls, and conversations as they happen.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Insights',
      description: 'Get intelligent summaries, action items, and key insights from your audio content.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            🎧 Revolutionary AI Technology
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Just Summit AI Headphones
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The world's first AI headphones with private, on-device transcription. 
            Get instant summaries of meetings, podcasts, and calls without compromising your privacy.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">Privacy-first design</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">On-device AI processing</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto max-w-2xl mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                <img 
                  src="/headphones-hero.png" 
                  alt="Just Summit AI Headphones" 
                  className="w-full h-auto max-w-md object-contain"
                />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
              Ships Q2 2026
            </div>
          </div>
        </div>

        {/* Video Showcase */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">See It In Action</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-2">
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
            <p className="text-gray-600 mt-4 text-lg">
              Experience the future of AI-powered audio technology
            </p>
          </div>
        </div>

        {/* Product Showcase */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto">
          <div className="text-center">
            <img 
              src="/headphones-side-view.png" 
              alt="Just Summit AI Headphones Side View" 
              className="w-full h-auto max-w-sm mx-auto mb-6 rounded-2xl shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-2">Premium Design</h3>
            <p className="text-gray-600">Professional-grade materials with AI branding and LED indicators</p>
          </div>
          <div className="text-center">
            <img 
              src="/headphones-features.png" 
              alt="AI Technology Features" 
              className="w-full h-auto max-w-sm mx-auto mb-6 rounded-2xl shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-2">AI Technology</h3>
            <p className="text-gray-600">Advanced microphone arrays and on-device AI processing</p>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {keyFeatures.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
          <p className="text-xl text-gray-600">Secure your AI headphones with a £49 deposit</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`relative transition-all duration-300 hover:scale-105 ${
                tier.popular 
                  ? 'border-blue-500 shadow-xl ring-2 ring-blue-200' 
                  : 'border-gray-200 shadow-lg hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Recommended</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-gray-600">{tier.description}</CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">£49 deposit today, balance before shipping</p>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <StripeCheckout 
                  tier={tier}
                  onSuccess={(result) => {
                    console.log('Pre-order successful:', result)
                    // Handle success (e.g., show confirmation, redirect)
                  }}
                  onError={(error) => {
                    console.error('Pre-order error:', error)
                    alert(`Error: ${error}`)
                  }}
                />
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Deposit Information */}
        <div className="text-center mt-12 p-6 bg-blue-50 rounded-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Your Spot with £49</h3>
          <p className="text-gray-700 mb-4">
            Reserve your AI headphones with a small deposit. We'll charge the remaining balance 
            30 days before shipping in Q2 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Fully refundable until production</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure payment processing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Early access to new features</span>
            </div>
          </div>
        </div>

        {/* Why Pre-Order Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Pre-Order Now?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Be Among the First</h4>
              <p className="text-gray-600">Join the early adopters experiencing the future of AI audio technology.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Lock in Early Pricing</h4>
              <p className="text-gray-600">Secure today's pricing before the official launch.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Shape the Product</h4>
              <p className="text-gray-600">Your feedback will help us perfect the final product before launch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadphonesSection

