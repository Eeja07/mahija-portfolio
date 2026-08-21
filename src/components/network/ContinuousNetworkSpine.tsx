"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { useTheme } from "next-themes"

export default function ContinuousNetworkSpine() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [docHeight, setDocHeight] = useState(8000)
  const isDark = resolvedTheme !== "light"

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  })

  // Scroll-activated laser light illumination filling the fiber optic tube
  const activePathLength = useTransform(smoothProgress, [0, 1], [0.03, 1])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const updateHeight = () => {
      const h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      )
      if (h > 600) {
        setDocHeight(h)
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    
    // ResizeObserver tracks dynamic content expansions
    const ro = new ResizeObserver(updateHeight)
    if (document.body) {
      ro.observe(document.body)
    }

    return () => {
      window.removeEventListener("resize", updateHeight)
      ro.disconnect()
    }
  }, [])

  if (!mounted) return null

  // Default Frosted Translucent Fiber Optic Glass Conduit styling
  const glassShroud = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(148, 163, 184, 0.22)"
  const glassCore = isDark ? "rgba(255, 255, 255, 0.22)" : "rgba(100, 116, 139, 0.38)"
  const nodeGlassStroke = isDark ? "rgba(255, 255, 255, 0.35)" : "rgba(148, 163, 184, 0.55)"

  // Dynamically compute section-aligned junction heights across full document height
  const h = docHeight
  const y0 = 0
  const y1 = Math.round(h * 0.10)
  const y2 = Math.round(h * 0.22)
  const y3 = Math.round(h * 0.35)
  const y4 = Math.round(h * 0.48)
  const y5 = Math.round(h * 0.60)
  const y6 = Math.round(h * 0.72)
  const y7 = Math.round(h * 0.84)
  const y8 = Math.round(h * 0.93)
  const yEnd = h

  // Left conduit routed strictly in the safe outer margin gutter (x = 28 .. 48), avoiding any text
  const desktopLeftPath = `M 38 ${y0} C 38 ${y1 * 0.5}, 26 ${y1 * 0.8}, 42 ${y1} C 50 ${y2 * 0.7}, 28 ${y2 * 0.9}, 36 ${y2} C 46 ${y3 * 0.8}, 26 ${y3 * 0.9}, 40 ${y3} C 48 ${y4 * 0.8}, 28 ${y4 * 0.9}, 36 ${y4} C 46 ${y5 * 0.8}, 26 ${y5 * 0.9}, 42 ${y5} C 48 ${y6 * 0.8}, 28 ${y6 * 0.9}, 36 ${y6} C 46 ${y7 * 0.8}, 28 ${y7 * 0.9}, 40 ${y7} C 48 ${y8 * 0.9}, 30 ${y8 * 0.95}, 38 ${y8} C 38 ${h - 100}, 38 ${h - 30}, 38 ${yEnd}`

  // Right conduit routed strictly in the safe outer margin gutter (x = 1392 .. 1412), avoiding any text
  const desktopRightPath = `M 1402 ${y0} C 1402 ${y1 * 0.5}, 1414 ${y1 * 0.8}, 1398 ${y1} C 1390 ${y2 * 0.7}, 1412 ${y2 * 0.9}, 1404 ${y2} C 1394 ${y3 * 0.8}, 1414 ${y3 * 0.9}, 1400 ${y3} C 1392 ${y4 * 0.8}, 1412 ${y4 * 0.9}, 1404 ${y4} C 1394 ${y5 * 0.8}, 1414 ${y5 * 0.9}, 1398 ${y5} C 1392 ${y6 * 0.8}, 1412 ${y6 * 0.9}, 1404 ${y6} C 1394 ${y7 * 0.8}, 1412 ${y7 * 0.9}, 1400 ${y7} C 1392 ${y8 * 0.9}, 1410 ${y8 * 0.95}, 1402 ${y8} C 1402 ${h - 100}, 1402 ${h - 30}, 1402 ${yEnd}`

  const desktopPulseLeft = `M 42 ${y0} C 42 ${y1 * 0.5}, 30 ${y1 * 0.8}, 46 ${y1} C 54 ${y2 * 0.7}, 32 ${y2 * 0.9}, 40 ${y2} C 50 ${y3 * 0.8}, 30 ${y3 * 0.9}, 44 ${y3} C 52 ${y4 * 0.8}, 32 ${y4 * 0.9}, 40 ${y4} C 50 ${y5 * 0.8}, 30 ${y5 * 0.9}, 46 ${y5} C 52 ${y6 * 0.8}, 32 ${y6 * 0.9}, 40 ${y6} C 50 ${y7 * 0.8}, 32 ${y7 * 0.9}, 44 ${y7} C 52 ${y8 * 0.9}, 34 ${y8 * 0.95}, 42 ${y8} C 42 ${h - 100}, 42 ${h - 30}, 42 ${yEnd}`

  const desktopPulseRight = `M 1398 ${y0} C 1398 ${y1 * 0.5}, 1410 ${y1 * 0.8}, 1394 ${y1} C 1386 ${y2 * 0.7}, 1408 ${y2 * 0.9}, 1400 ${y2} C 1390 ${y3 * 0.8}, 1410 ${y3 * 0.9}, 1396 ${y3} C 1388 ${y4 * 0.8}, 1408 ${y4 * 0.9}, 1400 ${y4} C 1390 ${y5 * 0.8}, 1410 ${y5 * 0.9}, 1394 ${y5} C 1388 ${y6 * 0.8}, 1408 ${y6 * 0.9}, 1400 ${y6} C 1390 ${y7 * 0.8}, 1408 ${y7 * 0.9}, 1396 ${y7} C 1388 ${y8 * 0.9}, 1406 ${y8 * 0.95}, 1398 ${y8} C 1398 ${h - 100}, 1398 ${h - 30}, 1398 ${yEnd}`

  // Perfectly round junction node coordinates strictly in the outer side gutters
  const junctionNodes = [
    { cx: 38, cy: Math.round(h * 0.04), threshold: 0.04 },
    { cx: 1402, cy: Math.round(h * 0.04), threshold: 0.04 },

    { cx: 42, cy: y1, threshold: 0.10 },
    { cx: 1398, cy: y1, threshold: 0.10 },

    { cx: 36, cy: y2, threshold: 0.22 },
    { cx: 1404, cy: y2, threshold: 0.22 },

    { cx: 40, cy: y3, threshold: 0.35 },
    { cx: 1400, cy: y3, threshold: 0.35 },

    { cx: 36, cy: y4, threshold: 0.48 },
    { cx: 1404, cy: y4, threshold: 0.48 },

    { cx: 42, cy: y5, threshold: 0.60 },
    { cx: 1398, cy: y5, threshold: 0.60 },

    { cx: 36, cy: y6, threshold: 0.72 },
    { cx: 1404, cy: y6, threshold: 0.72 },

    { cx: 40, cy: y7, threshold: 0.84 },
    { cx: 1400, cy: y7, threshold: 0.84 },

    // Bottom Contact Section Nodes
    { cx: 38, cy: y8, threshold: 0.93 },
    { cx: 1402, cy: y8, threshold: 0.93 },

    // Final Bottom Edge Nodes (Footer)
    { cx: 38, cy: Math.round(h - 40), threshold: 0.98 },
    { cx: 1402, cy: Math.round(h - 40), threshold: 0.98 },
  ]

  // Mobile micro-dots strictly in the outer 6px gutter
  const mobileDots = [
    Math.round(h * 0.04),
    y1,
    y2,
    y3,
    y4,
    y5,
    y6,
    y7,
    y8,
    Math.round(h - 40),
  ]

  return (
    <div
      aria-hidden="true"
      style={{ height: docHeight }}
      className="pointer-events-none absolute top-0 left-0 w-full z-0 overflow-hidden select-none opacity-90"
    >
      {/* ========================================================= */}
      {/* 1. DESKTOP CONTINUOUS FIBER OPTIC CONDUIT (>= 640px) */}
      {/* Default: Translucent White Glass Fiber */}
      {/* Scroll: Active Multi-Hue Laser Illumination */}
      {/* ========================================================= */}
      <svg
        className="hidden sm:block w-full h-full"
        viewBox={`0 0 1440 ${docHeight}`}
        fill="none"
      >
        <defs>
          {/* Scroll-activated dynamic laser gradient filling the fiber tube */}
          <linearGradient id="fiberLaserActive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#d4d4d8" : "#475569"} stopOpacity="0.95" />
            <stop offset="50%" stopColor={isDark ? "#a1a1aa" : "#64748b"} stopOpacity="0.9" />
            <stop offset="100%" stopColor={isDark ? "#d4d4d8" : "#475569"} stopOpacity="0.95" />
          </linearGradient>

          {/* Filter for crisp laser bloom */}
          <filter id="laserBloomActive" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* A. DEFAULT STATE: Translucent White Fiber Optic Glass Conduit */}
        {/* ------------------------------------------------------------- */}
        {/* Left default glass tube */}
        <path
          d={desktopLeftPath}
          stroke={glassShroud}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={desktopLeftPath}
          stroke={glassCore}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Right default glass tube */}
        <path
          d={desktopRightPath}
          stroke={glassShroud}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={desktopRightPath}
          stroke={glassCore}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ------------------------------------------------------------- */}
        {/* B. SCROLL-ACTIVATED STATE: Neutral Laser Light Illumination   */}
        {/* ------------------------------------------------------------- */}
        {/* Left active colored laser beam */}
        <motion.path
          d={desktopLeftPath}
          stroke="url(#fiberLaserActive)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#laserBloomActive)"
          style={{ pathLength: activePathLength }}
        />
        <motion.path
          d={desktopPulseLeft}
          stroke={isDark ? "rgba(212, 212, 216, 0.5)" : "rgba(71, 85, 105, 0.4)"}
          strokeWidth="1.4"
          strokeDasharray="16 24"
          className="animate-fiber-pulse"
          style={{ pathLength: activePathLength }}
        />

        {/* Right active colored laser beam */}
        <motion.path
          d={desktopRightPath}
          stroke="url(#fiberLaserActive)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#laserBloomActive)"
          style={{ pathLength: activePathLength }}
        />
        <motion.path
          d={desktopPulseRight}
          stroke={isDark ? "rgba(212, 212, 216, 0.5)" : "rgba(71, 85, 105, 0.4)"}
          strokeWidth="1.4"
          strokeDasharray="16 24"
          className="animate-fiber-pulse"
          style={{ pathLength: activePathLength }}
        />

        {/* ------------------------------------------------------------- */}
        {/* C. 100% PERFECT ROUND JUNCTION NODES                          */}
        {/* ------------------------------------------------------------- */}
        {junctionNodes.map((node, i) => (
          <g key={i}>
            {/* Default frosted glass outer ring */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={7}
              fill={isDark ? "#090d16" : "#ffffff"}
              stroke={nodeGlassStroke}
              strokeWidth={2}
            />
            {/* Illuminated active core */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={3}
              fill={isDark ? "#d4d4d8" : "#475569"}
            />
          </g>
        ))}
      </svg>

      {/* ========================================================= */}
      {/* 2. DEDICATED MOBILE DUAL-RAIL FIBER CONDUIT (< 640px)    */}
      {/* ========================================================= */}
      <svg
        className="block sm:hidden w-full h-full"
        viewBox={`0 0 390 ${docHeight}`}
        fill="none"
      >
        <defs>
          <linearGradient id="fiberLaserMobileActive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#d4d4d8" : "#475569"} stopOpacity="0.9" />
            <stop offset="50%" stopColor={isDark ? "#a1a1aa" : "#64748b"} stopOpacity="0.9" />
            <stop offset="100%" stopColor={isDark ? "#d4d4d8" : "#475569"} stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Default Translucent Rails */}
        <path d={`M 6 0 L 6 ${h}`} stroke={glassShroud} strokeWidth="4" />
        <path d={`M 6 0 L 6 ${h}`} stroke={glassCore} strokeWidth="1.5" />

        <path d={`M 384 0 L 384 ${h}`} stroke={glassShroud} strokeWidth="4" />
        <path d={`M 384 0 L 384 ${h}`} stroke={glassCore} strokeWidth="1.5" />

        {/* Scroll-Activated Colored Laser on Mobile */}
        <motion.path
          d={`M 6 0 L 6 ${h}`}
          stroke="url(#fiberLaserMobileActive)"
          strokeWidth="2.5"
          style={{ pathLength: activePathLength }}
        />
        <motion.path
          d={`M 384 0 L 384 ${h}`}
          stroke="url(#fiberLaserMobileActive)"
          strokeWidth="2.5"
          style={{ pathLength: activePathLength }}
        />

        {/* Round Junction Micro-Dots on Mobile Rails */}
        {mobileDots.map((yPos, i) => (
          <g key={i}>
            <circle cx={6} cy={yPos} r={3.5} fill={isDark ? "#d4d4d8" : "#475569"} stroke={nodeGlassStroke} strokeWidth={1} />
            <circle cx={384} cy={yPos} r={3.5} fill={isDark ? "#d4d4d8" : "#475569"} stroke={nodeGlassStroke} strokeWidth={1} />
          </g>
        ))}
      </svg>
    </div>
  )
}
