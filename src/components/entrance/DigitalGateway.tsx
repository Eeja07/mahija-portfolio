"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"

interface DigitalGatewayProps {
  isOpen: boolean
  onOpenComplete?: () => void
}

export default function DigitalGateway({ isOpen, onOpenComplete }: DigitalGatewayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const centerLockLeftRef = useRef<HTMLDivElement>(null)
  const centerLockRightRef = useRef<HTMLDivElement>(null)
  const seamLightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !leftPanelRef.current || !rightPanelRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { display: "none" })
      if (onOpenComplete) onOpenComplete()
      return
    }

    if (!isOpen) {
      gsap.set(leftPanelRef.current, { xPercent: 0, rotateY: 0, opacity: 1 })
      gsap.set(rightPanelRef.current, { xPercent: 0, rotateY: 0, opacity: 1 })
      return
    }

    // Sequence for cinematic door opening
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        if (containerRef.current) {
          gsap.set(containerRef.current, { display: "none" })
        }
        if (onOpenComplete) onOpenComplete()
      },
    })

    // Step 1: Seam pulse ignition
    if (seamLightRef.current) {
      tl.to(seamLightRef.current, {
        opacity: 1,
        scaleY: 1.05,
        duration: 0.35,
        ease: "power2.out",
      })
      tl.to(seamLightRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
    }

    // Step 2: Panels part smoothly with subtle perspective
    tl.to(
      leftPanelRef.current,
      {
        xPercent: -102,
        rotateY: -6,
        opacity: 0.85,
        duration: 1.5,
        ease: "power3.inOut",
      },
      "-=0.2"
    )

    tl.to(
      rightPanelRef.current,
      {
        xPercent: 102,
        rotateY: 6,
        opacity: 0.85,
        duration: 1.5,
        ease: "power3.inOut",
      },
      "<"
    )

    return () => {
      tl.kill()
    }
  }, [isOpen, onOpenComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      style={{ perspective: "1400px" }}
      aria-hidden="true"
    >
      {/* LEFT GATEWAY PANEL */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[var(--gateway-surface)] border-r border-[var(--gateway-border)] flex flex-col justify-between p-6 sm:p-10 select-none shadow-2xl origin-left"
      >
        {/* Subtle structural background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        {/* Vertical Server Rack Rail Detail */}
        <div className="absolute left-6 sm:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--gateway-border)] to-transparent opacity-60 flex flex-col justify-around items-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`rail-l-${i}`} className="w-1.5 h-1.5 rounded-full bg-[var(--gateway-rail)]/60" />
          ))}
        </div>

        {/* Top Telemetry Header on Left Panel */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-[var(--gateway-led)] animate-pulse" />
            <span className="tracking-widest uppercase font-semibold">GATEWAY BUS // 01</span>
          </div>
          <span className="hidden sm:inline font-mono opacity-60">DEBIAN 12 • NODE SECURE</span>
        </div>

        {/* Center Panel Graphic: Schematic Circuit & Fiber Conduits */}
        <div className="relative z-10 my-auto flex flex-col items-end pr-4 sm:pr-8">
          <svg
            viewBox="0 0 260 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 sm:w-60 h-auto opacity-50"
          >
            {/* Structural panel lines */}
            <path d="M 0 30 L 180 30 L 220 70 L 260 70" stroke="var(--gateway-border)" strokeWidth="1.5" />
            <path d="M 0 90 L 160 90 L 200 130 L 260 130" stroke="var(--gateway-border)" strokeWidth="1.5" />
            <path d="M 0 150 L 220 150 L 260 150" stroke="var(--gateway-border)" strokeWidth="1.5" />
            {/* Fiber conduit traces */}
            <path d="M 40 30 L 40 90" stroke="var(--fiber-core)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <path d="M 120 30 L 120 150" stroke="var(--fiber-core)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="180" cy="30" r="3" fill="var(--fiber-active)" />
            <circle cx="200" cy="130" r="3" fill="var(--fiber-active)" />
          </svg>
        </div>

        {/* Left Center Lock Half */}
        <div
          ref={centerLockLeftRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center"
        >
          <div className="w-6 sm:w-8 h-16 sm:h-24 bg-[var(--gateway-surface-inner)] border-y border-l border-[var(--gateway-border)] rounded-l-md flex flex-col justify-center items-center gap-1.5 shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--fiber-active)]" />
            <div className="w-1 h-8 bg-[var(--fiber-core)]/40 rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--fiber-active)]" />
          </div>
        </div>

        {/* Bottom Technical Status */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <span className="tracking-wider">SYS.ID: MAH-8802</span>
          <span className="font-mono">INITIALIZING</span>
        </div>
      </div>

      {/* RIGHT GATEWAY PANEL */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[var(--gateway-surface)] border-l border-[var(--gateway-border)] flex flex-col justify-between p-6 sm:p-10 select-none shadow-2xl origin-right"
      >
        {/* Subtle structural background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Vertical Server Rack Rail Detail */}
        <div className="absolute right-6 sm:right-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--gateway-border)] to-transparent opacity-60 flex flex-col justify-around items-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`rail-r-${i}`} className="w-1.5 h-1.5 rounded-full bg-[var(--gateway-rail)]/60" />
          ))}
        </div>

        {/* Top Telemetry Header on Right Panel */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <span className="hidden sm:inline font-mono opacity-60">FIBER OPTIC BACKBONE</span>
          <div className="flex items-center gap-2">
            <span className="tracking-widest uppercase font-semibold">ACCESS: AUTHORIZED</span>
            <span className="inline-block size-2 rounded-full bg-[var(--gateway-led)]" />
          </div>
        </div>

        {/* Center Panel Graphic: Symmetrical Schematic */}
        <div className="relative z-10 my-auto flex flex-col items-start pl-4 sm:pl-8">
          <svg
            viewBox="0 0 260 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 sm:w-60 h-auto opacity-50"
          >
            {/* Structural panel lines */}
            <path d="M 260 30 L 80 30 L 40 70 L 0 70" stroke="var(--gateway-border)" strokeWidth="1.5" />
            <path d="M 260 90 L 100 90 L 60 130 L 0 130" stroke="var(--gateway-border)" strokeWidth="1.5" />
            <path d="M 260 150 L 40 150 L 0 150" stroke="var(--gateway-border)" strokeWidth="1.5" />
            {/* Fiber conduit traces */}
            <path d="M 220 30 L 220 90" stroke="var(--fiber-core)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <path d="M 140 30 L 140 150" stroke="var(--fiber-core)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="80" cy="30" r="3" fill="var(--fiber-active)" />
            <circle cx="60" cy="130" r="3" fill="var(--fiber-active)" />
          </svg>
        </div>

        {/* Right Center Lock Half */}
        <div
          ref={centerLockRightRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center"
        >
          <div className="w-6 sm:w-8 h-16 sm:h-24 bg-[var(--gateway-surface-inner)] border-y border-r border-[var(--gateway-border)] rounded-r-md flex flex-col justify-center items-center gap-1.5 shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--fiber-active)]" />
            <div className="w-1 h-8 bg-[var(--fiber-core)]/40 rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--fiber-active)]" />
          </div>
        </div>

        {/* Bottom Technical Status */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
          <span className="font-mono">PORT 443 // SSL</span>
          <span className="tracking-wider">LINK STATUS: ACTIVE</span>
        </div>
      </div>

      {/* CENTER ILLUMINATED SEAM LINE */}
      <div
        ref={seamLightRef}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-[var(--fiber-active)] shadow-[0_0_15px_var(--fiber-glow)] opacity-0 pointer-events-none"
      />
    </div>
  )
}
