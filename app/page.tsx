import { Navbar } from "@/components/common/navbar"
import { HeroSection } from "@/components/sections/home/hero-section"
import { HomeSection } from "@/components/sections/home/home-section"
import { OwnDataSection } from "@/components/sections/home/own-data-section"
import { CaptainSection } from "@/components/sections/home/captain-section"
import { FeaturedSection } from "@/components/sections/home/featured-section"
import { TeamworkSection } from "@/components/sections/about/teamwork-section"
import { CtaSection } from "@/components/sections/home/cta-section"
import { Footer } from "@/components/common/footer"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <HomeSection />
      <OwnDataSection />

      <CaptainSection />
      <FeaturedSection />

      <TeamworkSection id="research-highlights" />
      <CtaSection />
      <Footer />
    </main>
  )
}
