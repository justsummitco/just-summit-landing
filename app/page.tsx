import Header from '@/components/Header'
import Hero from '@/components/Hero'
import UrgencyBanner from '@/components/UrgencyBanner'
import Pricing from '@/components/Pricing'
import GuaranteeBanner from '@/components/GuaranteeBanner'
import FounderStory from '@/components/FounderStory'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import EmailSignup from '@/components/EmailSignup'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <UrgencyBanner />
      <Pricing />
      <GuaranteeBanner />
      <FounderStory />
      <Testimonials />
      <FAQ />
      <EmailSignup />
      <Footer />
    </main>
  )
}

