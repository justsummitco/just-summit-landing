import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Pricing from '@/components/Pricing'
import FounderStory from '@/components/FounderStory'
import Testimonials from '@/components/Testimonials'
import EmailSignup from '@/components/EmailSignup'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Pricing />
      <FounderStory />
      <Testimonials />
      <EmailSignup />
      <Footer />
    </main>
  )
}

