"use client"

import React, { useState, useRef } from "react"
import NextImage from "next/image"
import { Image as ImageIcon, Award, Maximize2, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { MediaItem } from "@/types/experience"
import { cn } from "@/lib/utils"

export interface MediaSlide {
  type: "photo" | "certificate"
  title: string
  caption?: string
  image?: string
}

interface CardMediaPreviewProps {
  slides?: MediaSlide[]
  photoTitle?: string
  photoCaption?: string
  photoImage?: string
  certificateTitle?: string
  certificateCaption?: string
  certificateImage?: string
  contextTitle?: string
  onSelectMedia: (item: MediaItem) => void
  className?: string
  activeType?: "photo" | "certificate"
}

export default function CardMediaPreview({
  slides: propSlides,
  photoTitle = "Foto / Dokumentasi Kegiatan",
  photoCaption = "Slot pratinjau dokumentasi foto atau rekaman kegiatan.",
  photoImage,
  certificateTitle = "Sertifikat / Dokumen Resmi",
  certificateCaption = "Slot pratinjau sertifikat resmi, surat tugas, atau surat keputusan.",
  certificateImage,
  contextTitle,
  onSelectMedia,
  className = "",
  activeType = "photo",
}: CardMediaPreviewProps) {
  // Construct slides list if not provided directly
  const slides: MediaSlide[] = propSlides && propSlides.length > 0
    ? propSlides
    : [
        ...(photoTitle ? [{
          type: "photo" as const,
          title: photoTitle,
          caption: photoCaption,
          image: photoImage,
        }] : []),
        ...(certificateTitle ? [{
          type: "certificate" as const,
          title: certificateTitle,
          caption: certificateCaption,
          image: certificateImage,
        }] : []),
      ]

  const [currentIndex, setCurrentIndex] = useState(activeType === "certificate" && slides.length > 1 ? 1 : 0)
  const touchStartX = useRef<number | null>(null)

  const activeSlide = slides[currentIndex] || slides[0]
  const isCertificate = activeSlide?.type === "certificate"

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diffX) > 40 && slides.length > 1) {
      if (diffX > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    touchStartX.current = null
  }

  const handlePreviewClick = () => {
    if (!activeSlide) return
    onSelectMedia({
      type: activeSlide.image ? (isCertificate ? "certificate" : "image") : "placeholder",
      category: isCertificate ? "certificate" : "photo",
      isPlaceholder: !activeSlide.image,
      url: activeSlide.image,
      title: activeSlide.title,
      caption: activeSlide.caption,
      contextTitle,
    })
  }

  return (
    <div className={cn("w-full flex flex-col gap-2 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 select-none mt-auto", className)}>
      {/* Top Media Tabs / Switcher if more than 1 slide */}
      {slides.length > 1 && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                }}
                className={cn(
                  "px-2 py-0.5 rounded-md font-mono text-[10px] transition-all cursor-pointer flex items-center gap-1",
                  currentIndex === idx
                    ? "bg-background text-foreground shadow-2xs font-bold"
                    : "text-zinc-500 hover:text-foreground font-medium"
                )}
              >
                {slide.type === "certificate" ? <Award className="size-3" /> : <ImageIcon className="size-3" />}
                <span>{slide.type === "certificate" ? "Sertifikat" : `Foto ${slides.filter(s => s.type === "photo").length > 1 ? idx + 1 : ""}`}</span>
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>
      )}

      {/* Embedded Visual Preview Container (Equal fixed height: h-36 sm:h-40) */}
      <div
        onClick={handlePreviewClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="group relative w-full h-36 sm:h-40 shrink-0 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/70 dark:bg-zinc-950/60 overflow-hidden cursor-pointer flex flex-col justify-between p-3 transition-all duration-150 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-2xs"
        title="Klik untuk memperbesar / melihat ukuran penuh"
      >
        {activeSlide?.image ? (
          <>
            <NextImage
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-103"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none" />
          </>
        ) : (
          /* High-Precision Engineering Schematic Viewport */
          <>
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background/90 text-zinc-600 dark:text-zinc-400 font-mono text-[9px] font-semibold">
                {isCertificate ? (
                  <>
                    <ShieldCheck className="size-3 text-zinc-500" />
                    <span>VERIFIED CREDENTIAL</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="size-3 text-zinc-500" />
                    <span>PHOTO TELEMETRY</span>
                  </>
                )}
              </div>

              <div className="p-1 rounded-md bg-background/80 border border-zinc-200 dark:border-zinc-800 text-zinc-500 group-hover:text-foreground transition-colors">
                <Maximize2 className="size-3" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-0.5 mt-auto text-left pointer-events-none">
              <span className="font-mono text-xs font-bold text-foreground line-clamp-1">
                {activeSlide?.title}
              </span>
              <span className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {activeSlide?.caption}
              </span>
            </div>
          </>
        )}

        {/* Top/Bottom Badges when real image is present */}
        {activeSlide?.image && (
          <>
            <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/60 text-zinc-200 border border-white/10 backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="size-2.5 text-zinc-300" />
                <span>PREVIEW</span>
              </span>

              <div className="p-1 rounded bg-black/60 text-zinc-200 border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="size-3" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-0.5 text-left text-white pointer-events-none">
              <span className="font-mono text-xs font-bold line-clamp-1 text-zinc-100 drop-shadow-xs">
                {activeSlide.title}
              </span>
              <span className="font-sans text-[10px] line-clamp-1 text-zinc-300 drop-shadow-xs">
                {activeSlide.caption}
              </span>
            </div>
          </>
        )}

        {/* In-Card Slide Navigation Arrows (< and >) if multiple slides exist */}
        {slides.length > 1 && (
          <>
            <div className="absolute inset-y-0 inset-x-1.5 flex items-center justify-between pointer-events-none z-20">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto sebelumnya"
                className="pointer-events-auto p-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white opacity-85 hover:opacity-100 transition-all cursor-pointer active:scale-95 shadow-md"
              >
                <ChevronLeft className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto selanjutnya"
                className="pointer-events-auto p-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white opacity-85 hover:opacity-100 transition-all cursor-pointer active:scale-95 shadow-md"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            {/* Pagination Dots indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 pointer-events-none">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-200",
                    currentIndex === i
                      ? "w-3.5 bg-white shadow-xs"
                      : "w-1 bg-white/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
