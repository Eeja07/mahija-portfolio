"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"

interface FiberTypographyProps {
  isReady?: boolean
  isTransitioning?: boolean
  className?: string
}

// Letter strand definitions: each letter has primary and parallel fiber optic strands
interface LetterStrand {
  id: string
  char: string
  primaryPath: string
  secondaryPath?: string
  accentPath?: string
  junctions: [number, number][]
}

const LETTER_STRANDS: LetterStrand[] = [
  // P (X: 80 - 150)
  {
    id: "letter-p",
    char: "P",
    primaryPath: "M 95 115 L 95 25 L 135 25 C 154 25 154 72 135 72 L 95 72",
    secondaryPath: "M 102 115 L 102 33 L 132 33 C 145 33 145 64 132 64 L 102 64",
    junctions: [[95, 25], [135, 25], [135, 72], [95, 72], [95, 115]],
  },
  // O (X: 175 - 255)
  {
    id: "letter-o-1",
    char: "O",
    primaryPath: "M 215 25 C 245 25 255 45 255 70 C 255 95 245 115 215 115 C 185 115 175 95 175 70 C 175 45 185 25 215 25 Z",
    secondaryPath: "M 215 33 C 238 33 247 48 247 70 C 247 92 238 107 215 107 C 192 107 183 92 183 70 C 183 48 192 33 215 33 Z",
    junctions: [[215, 25], [255, 70], [215, 115], [175, 70]],
  },
  // R (X: 280 - 355)
  {
    id: "letter-r",
    char: "R",
    primaryPath: "M 295 115 L 295 25 L 335 25 C 352 25 352 68 335 68 L 295 68 M 326 68 L 355 115",
    secondaryPath: "M 302 115 L 302 33 L 332 33 C 344 33 344 60 332 60 L 302 60 M 335 68 L 364 115",
    junctions: [[295, 25], [335, 25], [335, 68], [295, 68], [295, 115], [355, 115]],
  },
  // T (X: 380 - 455)
  {
    id: "letter-t",
    char: "T",
    primaryPath: "M 385 25 L 460 25 M 422.5 25 L 422.5 115",
    secondaryPath: "M 385 32 L 460 32 M 429 32 L 429 115",
    junctions: [[385, 25], [460, 25], [422.5, 25], [422.5, 115]],
  },
  // F (X: 480 - 550)
  {
    id: "letter-f",
    char: "F",
    primaryPath: "M 495 115 L 495 25 L 555 25 M 495 68 L 542 68",
    secondaryPath: "M 502 115 L 502 33 L 552 33 M 502 75 L 538 75",
    junctions: [[495, 25], [555, 25], [495, 68], [542, 68], [495, 115]],
  },
  // O (X: 575 - 655)
  {
    id: "letter-o-2",
    char: "O",
    primaryPath: "M 615 25 C 645 25 655 45 655 70 C 655 95 645 115 615 115 C 585 115 575 95 575 70 C 575 45 585 25 615 25 Z",
    secondaryPath: "M 615 33 C 638 33 647 48 647 70 C 647 92 638 107 615 107 C 592 107 583 92 583 70 C 583 48 592 33 615 33 Z",
    junctions: [[615, 25], [655, 70], [615, 115], [575, 70]],
  },
  // L (X: 675 - 745)
  {
    id: "letter-l",
    char: "L",
    primaryPath: "M 690 25 L 690 115 L 750 115",
    secondaryPath: "M 697 25 L 697 108 L 750 108",
    junctions: [[690, 25], [690, 115], [750, 115]],
  },
  // I (X: 770 - 805)
  {
    id: "letter-i",
    char: "I",
    primaryPath: "M 775 25 L 805 25 M 790 25 L 790 115 M 775 115 L 805 115",
    secondaryPath: "M 796 32 L 796 108",
    junctions: [[775, 25], [805, 25], [790, 25], [790, 115], [775, 115], [805, 115]],
  },
  // O (X: 830 - 910)
  {
    id: "letter-o-3",
    char: "O",
    primaryPath: "M 870 25 C 900 25 910 45 910 70 C 910 95 900 115 870 115 C 840 115 830 95 830 70 C 830 45 840 25 870 25 Z",
    secondaryPath: "M 870 33 C 893 33 902 48 902 70 C 902 92 893 107 870 107 C 847 107 838 92 838 70 C 838 48 847 33 870 33 Z",
    junctions: [[870, 25], [910, 70], [870, 115], [830, 70]],
  },
]

// Infrastructure interconnect fiber lines (the patch bus connecting the letters)
const INFRA_BUS_PATHS = [
  "M 30 115 L 95 115",
  "M 135 72 L 175 70",
  "M 255 115 L 295 115",
  "M 355 115 L 385 115",
  "M 460 25 L 495 25",
  "M 555 25 L 575 35",
  "M 655 115 L 690 115",
  "M 750 115 L 775 115",
  "M 805 115 L 830 115",
  "M 910 115 L 970 115",
]

export default function FiberTypography({
  isReady = true,
  isTransitioning = false,
  className = "",
}: FiberTypographyProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const svg = svgRef.current
    const primaryCores = svg.querySelectorAll<SVGPathElement>(".fiber-core")
    const secondaryCores = svg.querySelectorAll<SVGPathElement>(".fiber-core-secondary")
    const pulsePaths = svg.querySelectorAll<SVGPathElement>(".fiber-pulse-line")
    const junctions = svg.querySelectorAll<SVGCircleElement>(".fiber-junction")
    const busLines = svg.querySelectorAll<SVGPathElement>(".fiber-bus-line")

    // If user prefers reduced motion, show full steady illumination immediately
    if (prefersReducedMotion) {
      gsap.set([primaryCores, secondaryCores, junctions, busLines], {
        opacity: 1,
        strokeDashoffset: 0,
      })
      return
    }

    // Set initial latent/dark state
    primaryCores.forEach((path) => {
      const length = path.getTotalLength() || 300
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0.3,
      })
    })

    secondaryCores.forEach((path) => {
      const length = path.getTotalLength() || 300
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0.15,
      })
    })

    pulsePaths.forEach((path) => {
      const length = path.getTotalLength() || 300
      gsap.set(path, {
        strokeDasharray: `40 ${length + 40}`,
        strokeDashoffset: 40,
        opacity: 0,
      })
    })

    gsap.set(junctions, { scale: 0, opacity: 0, transformOrigin: "center center" })
    gsap.set(busLines, { opacity: 0.2 })

    if (!isReady) return

    // Master Timeline: Progressive reveal sequence
    const tl = gsap.timeline({
      delay: 0.1,
      defaults: { ease: "power2.out" },
    })

    // Step 1: Inflow wave of optical core illumination across letters
    tl.to(
      primaryCores,
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
      },
      "start"
    )

    tl.to(
      secondaryCores,
      {
        strokeDashoffset: 0,
        opacity: 0.75,
        duration: 1.2,
        stagger: 0.08,
      },
      "start+=0.1"
    )

    // Step 2: Traveling pulse packets along the letters
    pulsePaths.forEach((path, index) => {
      const length = path.getTotalLength() || 300
      tl.fromTo(
        path,
        {
          opacity: 0.9,
          strokeDashoffset: length + 60,
        },
        {
          opacity: 0.2,
          strokeDashoffset: -60,
          duration: 1.1,
          ease: "power1.inOut",
        },
        `start+=${0.06 * index}`
      )
    })

    // Step 3: Illuminate optical terminal junctions
    tl.to(
      junctions,
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "back.out(2)",
      },
      "start+=0.4"
    )

    // Step 4: Infrastructure bus conduits activate
    tl.to(
      busLines,
      {
        opacity: 0.6,
        duration: 0.6,
      },
      "start+=0.6"
    )

    // Set up intermittent subtle idle pulse to keep it alive without high GPU usage
    const triggerSubtlePulse = () => {
      if (!svgRef.current) return
      const paths = Array.from(svgRef.current.querySelectorAll<SVGPathElement>(".fiber-pulse-line"))
      if (paths.length === 0) return

      // Pick 2 random paths to gently illuminate
      const randomIdx1 = Math.floor(Math.random() * paths.length)
      const randomIdx2 = (randomIdx1 + 3) % paths.length
      const targets = [paths[randomIdx1], paths[randomIdx2]]

      targets.forEach((target) => {
        if (!target) return
        const length = target.getTotalLength() || 300
        gsap.fromTo(
          target,
          { opacity: 0.8, strokeDashoffset: length + 40 },
          { opacity: 0, strokeDashoffset: -40, duration: 1.4, ease: "power2.inOut" }
        )
      })
    }

    pulseIntervalRef.current = setInterval(triggerSubtlePulse, 3800)

    return () => {
      tl.kill()
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current)
    }
  }, [isReady])

  // Surge animation when transitioning to 3D portfolio
  useEffect(() => {
    if (!isTransitioning || !svgRef.current) return

    const svg = svgRef.current
    const primaryCores = svg.querySelectorAll(".fiber-core")
    const pulsePaths = svg.querySelectorAll(".fiber-pulse-line")
    const junctions = svg.querySelectorAll(".fiber-junction")

    gsap.to(primaryCores, {
      stroke: "var(--fiber-active)",
      duration: 0.35,
      filter: "url(#fiberGlowBoost)",
    })

    gsap.to(junctions, {
      fill: "var(--fiber-active)",
      scale: 1.4,
      duration: 0.35,
      filter: "url(#fiberGlowBoost)",
    })

    pulsePaths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength() || 300
      gsap.fromTo(
        path,
        { opacity: 1, strokeDashoffset: length + 80 },
        { opacity: 1, strokeDashoffset: -80, duration: 0.5, repeat: 1, ease: "power3.inOut" }
      )
    })
  }, [isTransitioning])

  return (
    <div className={`relative w-full max-w-5xl mx-auto flex items-center justify-center ${className}`}>
      {/* Accessible semantic heading for screen readers & SEO */}
      <h1 className="sr-only">PORTFOLIO</h1>

      <svg
        ref={svgRef}
        viewBox="0 0 1000 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[160px] select-none pointer-events-none"
        aria-label="PORTFOLIO — Network Infrastructure Typography"
        role="img"
      >
        <title>PORTFOLIO</title>
        <defs>
          {/* Subtle controlled glow filter for fiber strands */}
          <filter id="fiberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* High-intensity surge filter for transition state */}
          <filter id="fiberGlowBoost" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blurHigh" />
            <feMerge>
              <feMergeNode in="blurHigh" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Infrastructure Bus Conduits (Interconnecting letters) */}
        <g className="fiber-bus-layer" opacity="0.6">
          {INFRA_BUS_PATHS.map((d, i) => (
            <React.Fragment key={`bus-${i}`}>
              {/* Base conduit channel */}
              <path
                d={d}
                stroke="var(--fiber-base)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Active optical patch line */}
              <path
                d={d}
                stroke="var(--fiber-core)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4 6"
                className="fiber-bus-line"
                opacity="0.5"
              />
            </React.Fragment>
          ))}
        </g>

        {/* 2. Base Physical Cable Conduits (Dark structural casing) */}
        <g className="fiber-conduit-layer">
          {LETTER_STRANDS.map((item) => (
            <React.Fragment key={`conduit-${item.id}`}>
              <path
                d={item.primaryPath}
                stroke="var(--fiber-base)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.35"
              />
              {item.secondaryPath && (
                <path
                  d={item.secondaryPath}
                  stroke="var(--fiber-base)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.2"
                />
              )}
            </React.Fragment>
          ))}
        </g>

        {/* 3. Optical Fiber Cores (Inner light-carrying cores) */}
        <g className="fiber-core-layer">
          {LETTER_STRANDS.map((item) => (
            <React.Fragment key={`core-${item.id}`}>
              {/* Secondary strand */}
              {item.secondaryPath && (
                <path
                  d={item.secondaryPath}
                  stroke="var(--fiber-core)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="fiber-core-secondary"
                  opacity="0.6"
                />
              )}
              {/* Primary high-illumination strand */}
              <path
                d={item.primaryPath}
                stroke="var(--fiber-core)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#fiberGlow)"
                className="fiber-core"
              />
            </React.Fragment>
          ))}
        </g>

        {/* 4. Optical Data Pulse Paths (High-speed photons traversing paths) */}
        <g className="fiber-pulse-layer">
          {LETTER_STRANDS.map((item) => (
            <path
              key={`pulse-${item.id}`}
              d={item.primaryPath}
              stroke="var(--fiber-active)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#fiberGlow)"
              className="fiber-pulse-line"
              opacity="0"
            />
          ))}
        </g>

        {/* 5. Terminal Junction Points (Optical coupling nodes) */}
        <g className="fiber-junction-layer">
          {LETTER_STRANDS.flatMap((item) =>
            item.junctions.map(([cx, cy], jIdx) => (
              <circle
                key={`junction-${item.id}-${jIdx}`}
                cx={cx}
                cy={cy}
                r="3"
                fill="var(--fiber-junction)"
                stroke="var(--surface-primary)"
                strokeWidth="1.2"
                className="fiber-junction"
              />
            ))
          )}
        </g>
      </svg>
    </div>
  )
}
