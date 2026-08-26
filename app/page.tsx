import { Navbar } from "@/components/common/navbar"
import { HeroSection } from "@/components/sections/home/hero-section"
import { PartnerLogos } from "@/components/sections/home/partner-logos"
import { WhatIsMbppSection } from "@/components/sections/home/what-is-mbpp-section"
import { WhyMbppSection } from "@/components/sections/home/why-mbpp-section"
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section"
import { FeaturedModuleSection } from "@/components/sections/home/featured-module-section"
import { CtaSection } from "@/components/sections/home/cta-section"
import { Footer } from "@/components/common/footer"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <PartnerLogos />
      <WhatIsMbppSection />
      <WhyMbppSection />

      <HowItWorksSection />
      <FeaturedModuleSection />

      <CtaSection />
      <Footer />
    </main>
  )
}