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
  const [visibleCount, setVisibleCount] = useState(3)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasDragged = useRef(false)

  const totalItems = React.Children.count(children)

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate active index based on card width
    const firstCard = scrollRef.current.firstElementChild as HTMLElement | null
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth
      const style = window.getComputedStyle(scrollRef.current)
      const gap = parseFloat(style.columnGap || style.gap || "24") || 24
      const step = cardWidth + gap
      if (step > 0) {
        const activeIdx = Math.round(scrollLeft / step)
        setCurrentIndex(Math.min(Math.max(0, activeIdx), Math.max(0, totalItems - visibleCount)))
      }
    }
  }, [totalItems, visibleCount])

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === "undefined") return
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    updateVisibleCount()
    updateScrollState()

    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => updateScrollState()
    container.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", () => {
      updateVisibleCount()
      updateScrollState()
    })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const firstCard = container.firstElementChild as HTMLElement | null
    if (!firstCard) return

    const cardWidth = firstCard.offsetWidth
    const style = window.getComputedStyle(container)
    const gap = parseFloat(style.columnGap || style.gap || "24") || 24
    const scrollStep = cardWidth + gap

    container.scrollBy({
      left: direction === "left" ? -scrollStep : scrollStep,
      behavior: "smooth",
    })
  }

  // Mouse Drag to Slide support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    hasDragged.current = false
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftStart.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const dist = x - startX.current
    if (Math.abs(dist) > 5) {
      hasDragged.current = true
      e.preventDefault()
      scrollRef.current.scrollLeft = scrollLeftStart.current - dist
    }
  }

  const handleMouseUpOrLeave = () => {
    isDragging.current = false
  }

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  return (
    <div className={cn("relative w-full flex flex-col gap-4", className)}>
      {/* Top Slider Navigation Controls Bar */}
      <div className="flex items-center justify-between gap-3 select-none px-1">
        {/* Progress status badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="inline-block size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          <span>
            {Math.min(currentIndex + 1, totalItems)} &ndash; {Math.min(currentIndex + visibleCount, totalItems)} dari {totalItems} item
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

      {/* Horizontal Scroll Snap Track: Strictly max 3 items visible on desktop (lg+), 2 on tablet (sm+), 1 on mobile */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleClickCapture}
        className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 pt-1 w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={cn(
              "shrink-0 snap-start w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] flex flex-col h-full self-stretch select-none",
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
