"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import FeaturedEngineering from "@/components/sections/FeaturedEngineering"
import Experience from "@/components/sections/Experience"
import FeaturedOrganizations from "@/components/sections/FeaturedOrganizations"
import FeaturedCommittees from "@/components/sections/FeaturedCommittees"
import Awards from "@/components/sections/Awards"
import FeaturedTraining from "@/components/sections/FeaturedTraining"
import Certifications from "@/components/sections/Certifications"
import FeaturedRepositories from "@/components/sections/FeaturedRepositories"
import Skills from "@/components/sections/Skills"
import Resume from "@/components/sections/Resume"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/layout/Footer"
import ContinuousNetworkSpine from "@/components/network/ContinuousNetworkSpine"
import PortfolioEntrance from "@/components/entrance/PortfolioEntrance"
import { AnimatePresence } from "motion/react"

// Lazy-load the heavy Three.js Network Infrastructure experience on-demand
const NetworkGatewayGate = dynamic(
  () => import("@/components/network/NetworkGatewayGate"),
  { ssr: false }
)

const TopologyBackground = dynamic(
  () => import("@/components/network/TopologyBackground"),
  { ssr: false }
)

type PortfolioStage = "entrance" | "network-3d" | "portfolio-content"

export default function Home() {
  const [stage, setStage] = useState<PortfolioStage>("entrance")

  React.useEffect(() => {
    // Preload heavy 3D network components in background after entrance renders
    const timer = setTimeout(() => {
      import("@/components/network/NetworkGatewayGate")
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleEnterSystem = (targetId?: string) => {
    setStage("portfolio-content")
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
      {/* 1. STAGE 1: IMMERSIVE DIGITAL GATEWAY & FIBER OPTIC TYPOGRAPHY ENTRANCE */}
      <AnimatePresence mode="wait">
        {stage === "entrance" && (
          <PortfolioEntrance
            key="entrance-stage"
            onEnter3D={() => setStage("network-3d")}
          />
        )}
      </AnimatePresence>

      {/* 2. STAGE 2: THREE.JS 3D NETWORK INFRASTRUCTURE (LAZY-LOADED) */}
      <AnimatePresence mode="wait">
        {stage === "network-3d" && (
          <NetworkGatewayGate
            key="network-3d-stage"
            onEnter={handleEnterSystem}
            onBackToEntrance={() => setStage("entrance")}
          />
        )}
      </AnimatePresence>

      {/* 3D Network Topology Background for Stages 2 & 3 */}
      {stage !== "entrance" && <TopologyBackground />}

      {/* 3. STAGE 3: MAIN PORTFOLIO SECTIONS */}
      {stage === "portfolio-content" && (
        <div className="relative w-full flex flex-col min-h-screen">
          {/* Continuous Spatial Network Fiber Spine spanning all sections and footer */}
          <ContinuousNetworkSpine />

          {/* Global Navigation Bar */}
          <header className="w-full">
            <Navbar onLogoClick={() => setStage("network-3d")} />
          </header>

          {/* Main content sections in complete preserved semantic order */}
          <main className="relative z-10 flex-1 flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Hero />
            <FeaturedEngineering />
            <Experience />
            <Skills />
            <FeaturedOrganizations />
            <FeaturedCommittees />
            <Awards />
            <FeaturedTraining />
            <Certifications />
            <FeaturedRepositories />
            <Resume />
            <Contact />
          </main>

          {/* Semantic Footer */}
          <Footer />
        </div>
      )}
    </div>
  )
}
