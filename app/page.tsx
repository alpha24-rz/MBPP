import { Navbar } from "@/components/common/navbar"
import { HeroSection } from "@/components/sections/home/hero-section"
import { WhatIsMbppSection } from "@/components/sections/home/what-is-mbpp-section"
import { WhyMbppSection } from "@/components/sections/home/why-mbpp-section"
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section"
import { FeaturedModuleSection } from "@/components/sections/home/featured-module-section"
import { TeamworkSection } from "@/components/sections/about/teamwork-section"
import { CtaSection } from "@/components/sections/home/cta-section"
import { Footer } from "@/components/common/footer"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <WhatIsMbppSection />
      <WhyMbppSection />

      <HowItWorksSection />
      <FeaturedModuleSection />

      <TeamworkSection id="research-highlights" />
      <CtaSection />
      <Footer />
    </main>
  )
}
