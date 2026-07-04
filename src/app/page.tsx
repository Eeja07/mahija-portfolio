import React from "react"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import Projects from "@/components/sections/Projects"
import EngineeringDecisions from "@/components/sections/EngineeringDecisions"
import Infrastructure from "@/components/sections/Infrastructure"
import EngineeringEvidence from "@/components/sections/EngineeringEvidence"
import EngineeringJourney from "@/components/sections/EngineeringJourney"
import EngineeringPhilosophy from "@/components/sections/EngineeringPhilosophy"
import Experience from "@/components/sections/Experience"
import Skills from "@/components/sections/Skills"
import Resume from "@/components/sections/Resume"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-200">
      {/* Header containing navigation */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main content body containing page sections */}
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <Projects />
        <EngineeringDecisions />
        <Infrastructure />
        <EngineeringEvidence />
        <EngineeringJourney />
        <EngineeringPhilosophy />
        <Experience />
        <Skills />
        <Resume />
        <Contact />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  )
}
