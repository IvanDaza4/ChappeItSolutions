import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ServicesPreview } from "@/components/services-preview"
import { SupportLevels } from "@/components/support-levels"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { TechBackground } from "@/components/tech-background"

export default function HomePage() {
  return (
    <>
      <TechBackground />
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ServicesPreview />
        <SupportLevels />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
