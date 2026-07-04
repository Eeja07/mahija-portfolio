import React from "react"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import FeaturedEngineering from "@/components/sections/FeaturedEngineering"
import Experience from "@/components/sections/Experience"
import FeaturedOrganizations from "@/components/sections/FeaturedOrganizations"
import FeaturedCommittees from "@/components/sections/FeaturedCommittees"
import Awards from "@/components/sections/Awards"
import FeaturedTraining from "@/components/sections/FeaturedTraining"
import FeaturedRepositories from "@/components/sections/FeaturedRepositories"
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

      {/* Main content body containing page sections in RC3 order */}
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <FeaturedEngineering />
        <Experience />
        <FeaturedOrganizations />
        <FeaturedCommittees />
        <Awards />
        <FeaturedTraining />
        <FeaturedRepositories />
        <Skills />
        <Resume />
        <Contact />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  )
}
