"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"

interface FiberNameProps {
  isReady?: boolean
  className?: string
}

export default function FiberName({ isReady = true, className = "" }: FiberNameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<SVGPathElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      if (textRef.current) gsap.set(textRef.current, { opacity: 1, y: 0 })
      if (lineRef.current) gsap.set(lineRef.current, { opacity: 0.6 })
      return
    }

    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0, y: 8, letterSpacing: "0.15em" })
    }

    if (lineRef.current) {
      const length = lineRef.current.getTotalLength() || 400
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0.2,
      })
    }

    if (pulseRef.current) {
      const length = pulseRef.current.getTotalLength() || 400
      gsap.set(pulseRef.current, {
        strokeDasharray: `30 ${length + 30}`,
        strokeDashoffset: 30,
        opacity: 0,
      })
    }

    if (!isReady) return

    const tl = gsap.timeline({
      delay: 0.6,
      defaults: { ease: "power2.out" },
    })

    // 1. Draw fiber line beneath name
    if (lineRef.current) {
      tl.to(lineRef.current, {
        strokeDashoffset: 0,
        opacity: 0.7,
        duration: 0.8,
      })
    }

    // 2. Pulse packets travel through line
    if (pulseRef.current) {
      const length = pulseRef.current.getTotalLength() || 400
      tl.fromTo(
        pulseRef.current,
        { opacity: 1, strokeDashoffset: length + 30 },
        { opacity: 0, strokeDashoffset: -30, duration: 0.9, ease: "power1.inOut" },
        "-=0.6"
      )
    }

    // 3. Name illuminates and locks into place
    if (textRef.current) {
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.22em",
          duration: 0.7,
        },
        "-=0.5"
      )
    }

    return () => {
      tl.kill()
    }
  }, [isReady])

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center gap-2 select-none ${className}`}
    >
      {/* Subordinate engineered name */}
      <p
        ref={textRef}
        className="font-mono text-xs sm:text-sm md:text-base font-semibold uppercase text-zinc-700 dark:text-zinc-300 transition-colors"
      >
        Mahija Ibad Pradipta
      </p>

      {/* Fiber optic underline with photon pulse trajectory */}
      <svg
        viewBox="0 0 400 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 sm:w-64 md:w-80 h-auto overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        {/* Left Terminal Node */}
        <circle cx="20" cy="8" r="2.5" fill="var(--fiber-junction)" opacity="0.8" />
        <circle cx="20" cy="8" r="1.2" fill="var(--surface-primary)" />

        {/* Base conduit */}
        <path
          d="M 20 8 L 380 8"
          stroke="var(--fiber-base)"
          strokeWidth="2.5"
          opacity="0.3"
        />

        {/* Optical core line */}
        <path
          ref={lineRef}
          d="M 20 8 L 380 8"
          stroke="var(--fiber-core)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Traveling pulse packet */}
        <path
          ref={pulseRef}
          d="M 20 8 L 380 8"
          stroke="var(--fiber-active)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#fiberGlow)"
        />

        {/* Center Optical Coupler Node */}
        <circle cx="200" cy="8" r="2.2" fill="var(--fiber-active)" opacity="0.9" />

        {/* Right Terminal Node */}
        <circle cx="380" cy="8" r="2.5" fill="var(--fiber-junction)" opacity="0.8" />
        <circle cx="380" cy="8" r="1.2" fill="var(--surface-primary)" />
      </svg>
    </div>
  )
}
