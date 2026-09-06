"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionCardSliderProps {
  children: React.ReactNode[]
  className?: string
  cardClassName?: string
}

export default function SectionCardSlider({
  children,
  className = "",
  cardClassName = "",
}: SectionCardSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const totalItems = React.Children.count(children)

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Estimate current active card index based on scroll offset
    if (clientWidth > 0) {
      const cardWidth = scrollWidth / totalItems
      const activeIdx = Math.round(scrollLeft / cardWidth)
      setCurrentIndex(Math.min(Math.max(0, activeIdx), totalItems - 1))
    }
  }, [totalItems])

  useEffect(() => {
    updateScrollState()
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => updateScrollState()
    container.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateScrollState)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const clientWidth = container.clientWidth

    // Scroll by roughly 1 card width or viewport width
    const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75
    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <div className={cn("relative w-full flex flex-col gap-4", className)}>
      {/* Top Slider Navigation Controls Bar */}
      <div className="flex items-center justify-between gap-3 select-none px-1">
        {/* Progress status badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="inline-block size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          <span>
            {Math.min(currentIndex + 1, totalItems)} &ndash; {Math.min(currentIndex + 3, totalItems)} dari {totalItems} item
          </span>
        </div>

        {/* Linear Minimalist Left/Right Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Geser ke kiri"
            className={cn(
              "p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-foreground transition-all duration-150 cursor-pointer shadow-xs",
              canScrollLeft
                ? "hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 active:scale-95"
                : "opacity-30 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Geser ke kanan"
            className={cn(
              "p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-foreground transition-all duration-150 cursor-pointer shadow-xs",
              canScrollRight
                ? "hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 active:scale-95"
                : "opacity-30 cursor-not-allowed"
            )}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Snap Track: Exactly 3 items visible on desktop */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={cn(
              "shrink-0 snap-start w-[88vw] sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] h-full flex flex-col",
              cardClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
