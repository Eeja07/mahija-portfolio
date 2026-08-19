"use client"

import React, { useRef } from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export function SpotlightCard({
  children,
  className,
  spotlightColor,
  style,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty("--mouse-x", `${x}px`)
    cardRef.current.style.setProperty("--mouse-y", `${y}px`)
    if (spotlightColor) {
      cardRef.current.style.setProperty("--spotlight-color", spotlightColor)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -2, transition: { duration: 0.15, ease: "easeOut" } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
      style={style}
      className={cn(
        "spotlight-card relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 backdrop-blur-[2px] transition-colors duration-200 hover:border-zinc-300 dark:hover:border-zinc-700",
        className
      )}
      {...props}
    >
      <div className="relative z-10 size-full">{children}</div>
    </motion.div>
  )
}
