import React from "react"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import Projects from "@/components/sections/Projects"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header containing navigation */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main content body containing page sections */}
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <Projects />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  )
}
