import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HomeSection } from "@/components/home-section"
import { OwnDataSection } from "@/components/own-data-section"
import { CaptainSection } from "@/components/captain-section"
import { FeaturedSection } from "@/components/featured-section"
import { TeamworkSection } from "@/components/teamwork-section"
import { DeveloperSection } from "@/components/developer-section"
import { ExploringSection } from "@/components/exploring-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <HomeSection />
      <OwnDataSection />

      <CaptainSection />
      <FeaturedSection />

      {/* <TeamworkSection />
      <DeveloperSection />
      <ExploringSection /> */}
      <Footer />
    </main>
  )
}
