import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import Stats from '../components/Stats.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
