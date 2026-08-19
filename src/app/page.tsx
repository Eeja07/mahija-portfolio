"use client"

import React, { useState } from "react"
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
import TopologyBackground from "@/components/network/TopologyBackground"
import ContinuousNetworkSpine from "@/components/network/ContinuousNetworkSpine"
import NetworkGatewayGate from "@/components/network/NetworkGatewayGate"
import { AnimatePresence } from "motion/react"

export default function Home() {
  const [isEntered, setIsEntered] = useState(false)

  const handleEnterSystem = (targetId?: string) => {
    setIsEntered(true)
    if (targetId && targetId !== "#") {
      setTimeout(() => {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const headerOffset = 70
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 180)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-200 overflow-x-hidden">
      {/* 3D Network Topology Background */}
      <TopologyBackground />

      {/* INITIAL GATEWAY STAGE: Fullscreen 3D Server Chassis & Cable Hub ONLY */}
      <AnimatePresence>
        {!isEntered && (
          <NetworkGatewayGate onEnter={handleEnterSystem} />
        )}
      </AnimatePresence>

      {/* MAIN PORTFOLIO SECTIONS (Unveiled after entering) */}
      {isEntered && (
        <>
          {/* Global Navigation Bar */}
          <header className="w-full">
            <Navbar onLogoClick={() => setIsEntered(false)} />
          </header>

          {/* Main content sections in complete preserved semantic order */}
          <main className="relative z-10 flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Continuous Spatial Network Fiber Spine */}
            <ContinuousNetworkSpine />
            
            <Hero />
            <FeaturedEngineering />
            <Experience />
            <Skills />
            <FeaturedOrganizations />
            <FeaturedCommittees />
            <Awards />
            <FeaturedTraining />
            <FeaturedRepositories />
            <Resume />
            <Contact />
          </main>

          {/* Semantic Footer */}
          <Footer />
        </>
      )}
    </div>
  )
}
