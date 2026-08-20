"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { useTheme } from "next-themes"

export default function ContinuousNetworkSpine() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = resolvedTheme !== "light"

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  })

  // Transform scroll progress to path lengths
  const pathLength = useTransform(smoothProgress, [0, 1], [0.05, 1])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  const strokeBase = isDark ? "rgba(56, 189, 248, 0.14)" : "rgba(37, 99, 235, 0.12)"
  const strokeGlow = isDark ? "rgba(56, 189, 248, 0.85)" : "rgba(37, 99, 235, 0.75)"
  const packetColor = isDark ? "#00f0ff" : "#2563eb"
  const emeraldColor = isDark ? "#10b981" : "#059669"

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 w-full h-full overflow-hidden select-none opacity-80"
    >
      {/* ========================================== */}
      {/* 1. DESKTOP CONTINUOUS MULTI-STRAND SPINAL CONDUIT (>= 640px) */}
      {/* ========================================== */}
      <svg
        className="hidden sm:block w-full h-full"
        viewBox="0 0 1440 7000"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glowing laser gradient */}
          <linearGradient id="fiberLaserMain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#00f0ff" : "#2563eb"} stopOpacity="0.9" />
            <stop offset="20%" stopColor={isDark ? "#38bdf8" : "#3b82f6"} stopOpacity="0.8" />
            <stop offset="40%" stopColor={isDark ? "#10b981" : "#059669"} stopOpacity="0.9" />
            <stop offset="60%" stopColor={isDark ? "#818cf8" : "#4f46e5"} stopOpacity="0.85" />
            <stop offset="80%" stopColor={isDark ? "#38bdf8" : "#3b82f6"} stopOpacity="0.9" />
            <stop offset="100%" stopColor={isDark ? "#10b981" : "#059669"} stopOpacity="0.95" />
          </linearGradient>

          {/* Filter for subtle laser bloom */}
          <filter id="laserBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* LEFT SPINAL OPTICAL CONDUIT (Full Height down through Footer) */}
        <path
          d="M 120 0 
             C 120 400, 80 800, 140 1200 
             C 200 1600, 90 2000, 110 2400 
             C 130 2800, 70 3200, 130 3600 
             C 190 4000, 90 4400, 120 4800 
             C 150 5200, 80 5600, 120 6000
             C 120 6300, 120 6600, 120 7000"
          stroke={strokeBase}
          strokeWidth="3"
          strokeLinecap="round"
        />

        <motion.path
          d="M 120 0 
             C 120 400, 80 800, 140 1200 
             C 200 1600, 90 2000, 110 2400 
             C 130 2800, 70 3200, 130 3600 
             C 190 4000, 90 4400, 120 4800 
             C 150 5200, 80 5600, 120 6000
             C 120 6300, 120 6600, 120 7000"
          stroke="url(#fiberLaserMain)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#laserBloom)"
          style={{ pathLength }}
        />

        <path
          d="M 126 0 
             C 126 400, 86 800, 146 1200 
             C 206 1600, 96 2000, 116 2400 
             C 136 2800, 76 3200, 136 3600 
             C 196 4000, 96 4400, 126 4800 
             C 156 5200, 86 5600, 126 6000
             C 126 6300, 126 6600, 126 7000"
          stroke={isDark ? "rgba(16, 185, 129, 0.18)" : "rgba(16, 185, 129, 0.12)"}
          strokeWidth="1.5"
          strokeDasharray="10 16"
          className="animate-fiber-pulse"
        />

        {/* RIGHT SPINAL OPTICAL CONDUIT (Full Height down through Footer) */}
        <path
          d="M 1320 0 
             C 1320 400, 1360 800, 1300 1200 
             C 1240 1600, 1350 2000, 1330 2400 
             C 1310 2800, 1370 3200, 1310 3600 
             C 1250 4000, 1350 4400, 1320 4800 
             C 1290 5200, 1360 5600, 1320 6000
             C 1320 6300, 1320 6600, 1320 7000"
          stroke={strokeBase}
          strokeWidth="3"
          strokeLinecap="round"
        />

        <motion.path
          d="M 1320 0 
             C 1320 400, 1360 800, 1300 1200 
             C 1240 1600, 1350 2000, 1330 2400 
             C 1310 2800, 1370 3200, 1310 3600 
             C 1250 4000, 1350 4400, 1320 4800 
             C 1290 5200, 1360 5600, 1320 6000
             C 1320 6300, 1320 6600, 1320 7000"
          stroke="url(#fiberLaserMain)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#laserBloom)"
          style={{ pathLength }}
        />

        <path
          d="M 1314 0 
             C 1314 400, 1354 800, 1294 1200 
             C 1234 1600, 1344 2000, 1324 2400 
             C 1304 2800, 1364 3200, 1304 3600 
             C 1244 4000, 1344 4400, 1314 4800 
             C 1284 5200, 1354 5600, 1314 6000
             C 1314 6300, 1314 6600, 1314 7000"
          stroke={isDark ? "rgba(0, 240, 255, 0.20)" : "rgba(37, 99, 235, 0.12)"}
          strokeWidth="1.5"
          strokeDasharray="10 16"
          className="animate-fiber-pulse"
        />

        {/* CROSS-SECTION WEAVES */}
        <path d="M 140 1200 C 400 1280, 1000 1120, 1300 1200" stroke={strokeBase} strokeWidth="2" strokeDasharray="6 8" />
        <path d="M 1330 2400 C 1000 2480, 400 2320, 110 2400" stroke={strokeBase} strokeWidth="2" strokeDasharray="6 8" />
        <path d="M 130 3600 C 400 3680, 1000 3520, 1310 3600" stroke={strokeBase} strokeWidth="2" strokeDasharray="6 8" />
        <path d="M 1320 4800 C 1000 4880, 400 4720, 120 4800" stroke={strokeBase} strokeWidth="2" strokeDasharray="6 8" />
        <path d="M 120 6000 C 400 6080, 1000 5920, 1320 6000" stroke={strokeBase} strokeWidth="2" strokeDasharray="6 8" />
        <path d="M 120 6850 C 400 6900, 1000 6800, 1320 6850" stroke={strokeBase} strokeWidth="2" strokeDasharray="6 8" />

        {/* EXACT MATHEMATICALLY ALIGNED JUNCTION NODES */}
        {[
          // Top to mid sections
          { cx: 115, cy: 300 },
          { cx: 140, cy: 1200 },
          { cx: 110, cy: 2400 },
          { cx: 130, cy: 3600 },
          { cx: 120, cy: 4800 },
          // Get in Touch section: precisely computed curve point
          { cx: 107, cy: 5700 },
          { cx: 120, cy: 6000 },
          // Footer cluster termination points:
          { cx: 120, cy: 6500 },
          { cx: 120, cy: 6850 },

          // Right side
          { cx: 1325, cy: 300 },
          { cx: 1300, cy: 1200 },
          { cx: 1330, cy: 2400 },
          { cx: 1310, cy: 3600 },
          { cx: 1320, cy: 4800 },
          // Get in Touch section: precisely computed curve point
          { cx: 1333, cy: 5700 },
          { cx: 1320, cy: 6000 },
          // Footer cluster termination points:
          { cx: 1320, cy: 6500 },
          { cx: 1320, cy: 6850 },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r="7" fill={isDark ? "#090d16" : "#ffffff"} stroke={strokeGlow} strokeWidth="2" />
            <circle cx={node.cx} cy={node.cy} r="3" fill={i % 2 === 0 ? packetColor : emeraldColor} />
          </g>
        ))}
      </svg>

      {/* ========================================== */}
      {/* 2. DEDICATED MOBILE CLEAN DUAL-RAIL CONDUIT (< 640px) */}
      {/* ========================================== */}
      <svg
        className="block sm:hidden w-full h-full"
        viewBox="0 0 390 7000"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fiberLaserMobile" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#00f0ff" : "#2563eb"} stopOpacity="0.8" />
            <stop offset="50%" stopColor={isDark ? "#10b981" : "#059669"} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isDark ? "#00f0ff" : "#2563eb"} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Clean Left Side Rail (Gutter at x=10) */}
        <path
          d="M 10 0 L 10 7000"
          stroke={strokeBase}
          strokeWidth="2"
        />
        <motion.path
          d="M 10 0 L 10 7000"
          stroke="url(#fiberLaserMobile)"
          strokeWidth="2"
          style={{ pathLength }}
        />

        {/* Clean Right Side Rail (Gutter at x=380) */}
        <path
          d="M 380 0 L 380 7000"
          stroke={strokeBase}
          strokeWidth="2"
        />
        <motion.path
          d="M 380 0 L 380 7000"
          stroke="url(#fiberLaserMobile)"
          strokeWidth="2"
          style={{ pathLength }}
        />

        {/* Subtle Junction Micro-Dots on Mobile Rails (Down to Footer) */}
        {[600, 1400, 2200, 3000, 3800, 4600, 5400, 6200, 6850].map((y, i) => (
          <g key={i}>
            <circle cx="10" cy={y} r="3" fill={isDark ? "#00f0ff" : "#2563eb"} />
            <circle cx="380" cy={y} r="3" fill={isDark ? "#10b981" : "#059669"} />
          </g>
        ))}
      </svg>
    </div>
  )
}
