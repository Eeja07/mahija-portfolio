"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"

interface EntranceTransitionProps {
  isTransitioning: boolean
  onTransitionComplete: () => void
}

export default function EntranceTransition({
  isTransitioning,
  onTransitionComplete,
}: EntranceTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const tunnelRingsRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isTransitioning || !overlayRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      onTransitionComplete()
      return
    }

    const tl = gsap.timeline()

    // 1. Fade in forward optical burst overlay to full opacity
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.in",
    })

    // 2. Forward zoom rings expand outward from center
    if (tunnelRingsRef.current) {
      const rings = tunnelRingsRef.current.querySelectorAll("circle, line")
      tl.fromTo(
        rings,
        { scale: 0.2, opacity: 0, transformOrigin: "center center" },
        { scale: 2.4, opacity: 0.95, duration: 0.4, stagger: 0.03, ease: "power2.in" },
        "-=0.15"
      )
    }

    // 3. Hand over cleanly to 3D stage while overlay is completely opaque and covering
    tl.call(() => {
      onTransitionComplete()
    })

    return () => {
      tl.kill()
    }
  }, [isTransitioning, onTransitionComplete])

  if (!isTransitioning) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-background text-foreground opacity-0"
      aria-hidden="true"
    >
      <svg
        ref={tunnelRingsRef}
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[120vw] h-[120vh] max-w-none select-none pointer-events-none"
      >
        {/* Optical Data Conduit Converging Rings */}
        <circle cx="400" cy="400" r="80" stroke="var(--fiber-active)" strokeWidth="2.5" opacity="0.5" />
        <circle cx="400" cy="400" r="160" stroke="var(--fiber-core)" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
        <circle cx="400" cy="400" r="260" stroke="var(--fiber-active)" strokeWidth="1.5" strokeDasharray="10 10" opacity="0.7" />
        <circle cx="400" cy="400" r="380" stroke="var(--fiber-core)" strokeWidth="1.2" opacity="0.4" />

        {/* Optical Ray Conduits */}
        <line x1="400" y1="400" x2="80" y2="80" stroke="var(--fiber-active)" strokeWidth="2" opacity="0.6" />
        <line x1="400" y1="400" x2="720" y2="80" stroke="var(--fiber-active)" strokeWidth="2" opacity="0.6" />
        <line x1="400" y1="400" x2="80" y2="720" stroke="var(--fiber-active)" strokeWidth="2" opacity="0.6" />
        <line x1="400" y1="400" x2="720" y2="720" stroke="var(--fiber-active)" strokeWidth="2" opacity="0.6" />
      </svg>
    </div>
  )
}
