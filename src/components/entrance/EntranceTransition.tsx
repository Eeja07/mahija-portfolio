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

    const tl = gsap.timeline({
      onComplete: onTransitionComplete,
    })

    // 1. Initial fade-in of forward optical burst overlay
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.in",
    })

    // 2. Forward zoom lines expand outward from center
    if (tunnelRingsRef.current) {
      const rings = tunnelRingsRef.current.querySelectorAll("circle, line")
      tl.fromTo(
        rings,
        { scale: 0.2, opacity: 0, transformOrigin: "center center" },
        { scale: 2.2, opacity: 0.8, duration: 0.45, stagger: 0.04, ease: "power2.in" },
        "-=0.2"
      )
    }

    // 3. Final smooth fade through to 3D canvas
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      "+=0.1"
    )

    return () => {
      tl.kill()
    }
  }, [isTransitioning, onTransitionComplete])

  if (!isTransitioning) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-background/95 backdrop-blur-sm opacity-0"
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
        <circle cx="400" cy="400" r="80" stroke="var(--fiber-active)" strokeWidth="2" opacity="0.4" />
        <circle cx="400" cy="400" r="160" stroke="var(--fiber-core)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.5" />
        <circle cx="400" cy="400" r="260" stroke="var(--fiber-active)" strokeWidth="1" strokeDasharray="10 10" opacity="0.6" />
        <circle cx="400" cy="400" r="380" stroke="var(--fiber-core)" strokeWidth="1" opacity="0.3" />

        {/* Optical Ray Conduits */}
        <line x1="400" y1="400" x2="100" y2="100" stroke="var(--fiber-active)" strokeWidth="1.5" opacity="0.5" />
        <line x1="400" y1="400" x2="700" y2="100" stroke="var(--fiber-active)" strokeWidth="1.5" opacity="0.5" />
        <line x1="400" y1="400" x2="100" y2="700" stroke="var(--fiber-active)" strokeWidth="1.5" opacity="0.5" />
        <line x1="400" y1="400" x2="700" y2="700" stroke="var(--fiber-active)" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </div>
  )
}
