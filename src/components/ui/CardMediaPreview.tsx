"use client"

import React, { useState, useRef } from "react"
import NextImage from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Image as ImageIcon, Award, FileText, Maximize2, ChevronLeft, ChevronRight } from "lucide-react"
import { MediaItem } from "@/types/experience"
import { useLanguage } from "@/context/LanguageContext"
import { cn } from "@/lib/utils"

export interface MediaSlide {
  type: "photo" | "certificate"
  title: string
  caption?: string
  image?: string
  url?: string
  thumbnail?: string
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
  photoTitle,
  photoCaption,
  photoImage,
  certificateTitle,
  certificateCaption,
  certificateImage,
  contextTitle,
  onSelectMedia,
  className = "",
  activeType = "photo",
}: CardMediaPreviewProps) {
  const { language } = useLanguage()
  const isEn = language === "en"

  const defaultPhotoTitle = photoTitle || (isEn ? "Photo / Documentation" : "Foto / Dokumentasi")
  const defaultCertTitle = certificateTitle || (isEn ? "Certificate / Credential" : "Sertifikat / Dokumen")

  // Construct raw slides if not provided directly
  const allSlides: MediaSlide[] = propSlides && propSlides.length > 0
    ? propSlides
    : [
        {
          type: "photo" as const,
          title: defaultPhotoTitle,
          caption: photoCaption,
          image: photoImage,
        },
        {
          type: "certificate" as const,
          title: defaultCertTitle,
          caption: certificateCaption,
          image: certificateImage,
        },
      ]

  // Group strictly by category: "photo" and "certificate"
  const photoSlides = allSlides.filter((s) => s.type === "photo")
  const certSlides = allSlides.filter((s) => s.type === "certificate")

  const hasPhotos = photoSlides.length > 0
  const hasCerts = certSlides.length > 0

  const [selectedCategory, setSelectedCategory] = useState<"photo" | "certificate">(() => {
    if (activeType === "certificate" && hasCerts) return "certificate"
    if (hasPhotos) return "photo"
    return "certificate"
  })

  // Track slide index & motion direction per category
  const [photoIndex, setPhotoIndex] = useState(0)
  const [certIndex, setCertIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<number>(1)

  // Drag & touch gesture tracking
  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef<boolean>(false)
  const touchStartX = useRef<number | null>(null)

  const currentCategorySlides = selectedCategory === "photo" ? photoSlides : certSlides
  const currentSlideIndex = selectedCategory === "photo" ? photoIndex : certIndex
  const activeSlide = currentCategorySlides[currentSlideIndex] || currentCategorySlides[0]
  const isCertificate = selectedCategory === "certificate"

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (currentCategorySlides.length <= 1) return
    setSlideDirection(1)
    if (selectedCategory === "photo") {
      setPhotoIndex((prev) => (prev + 1) % photoSlides.length)
    } else {
      setCertIndex((prev) => (prev + 1) % certSlides.length)
    }
  }

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (currentCategorySlides.length <= 1) return
    setSlideDirection(-1)
    if (selectedCategory === "photo") {
      setPhotoIndex((prev) => (prev - 1 + photoSlides.length) % photoSlides.length)
    } else {
      setCertIndex((prev) => (prev - 1 + certSlides.length) % certSlides.length)
    }
  }

  // Mouse drag handlers (for desktop sliding)
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return
    if (Math.abs(e.clientX - dragStartX.current) > 8) {
      isDragging.current = true
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== null) {
      const diffX = dragStartX.current - e.clientX
      if (Math.abs(diffX) > 30 && currentCategorySlides.length > 1) {
        if (diffX > 0) {
          handleNext()
        } else {
          handlePrev()
        }
      }
    }
    dragStartX.current = null
    setTimeout(() => {
      isDragging.current = false
    }, 60)
  }

  const handleMouseLeave = () => {
    dragStartX.current = null
    setTimeout(() => {
      isDragging.current = false
    }, 60)
  }

  // Touch gesture handlers (for mobile swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    isDragging.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && Math.abs(e.touches[0].clientX - touchStartX.current) > 8) {
      isDragging.current = true
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diffX = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(diffX) > 30 && currentCategorySlides.length > 1) {
        if (diffX > 0) {
          handleNext()
        } else {
          handlePrev()
        }
      }
    }
    touchStartX.current = null
    setTimeout(() => {
      isDragging.current = false
    }, 60)
  }

  const getPreviewImage = (slide?: MediaSlide): string | undefined => {
    if (!slide) return undefined
    if (slide.thumbnail) return slide.thumbnail
    if (slide.image && !slide.image.toLowerCase().endsWith(".pdf")) return slide.image
    const rawUrl = slide.url || slide.image
    if (rawUrl && rawUrl.toLowerCase().endsWith(".pdf")) {
      const cleanUrl = rawUrl.startsWith("/") ? rawUrl.slice(1) : rawUrl
      return `/thumbnails/${cleanUrl.replace(/\.pdf$/i, ".webp")}`
    }
    return undefined
  }

  const handlePreviewClick = () => {
    if (isDragging.current || !activeSlide) return
    const mediaUrl = activeSlide.url || activeSlide.image
    const isPdf = !!mediaUrl && mediaUrl.toLowerCase().endsWith(".pdf")
    const thumb = getPreviewImage(activeSlide)
    onSelectMedia({
      type: mediaUrl ? (isCertificate ? "certificate" : isPdf ? "document" : "image") : "placeholder",
      category: isCertificate ? "certificate" : isPdf ? "document" : "photo",
      isPlaceholder: !mediaUrl,
      url: mediaUrl,
      thumbnail: thumb,
      title: activeSlide.title,
      caption: activeSlide.caption,
      contextTitle,
    })
  }

  return (
    <div className={cn("w-full flex flex-col gap-2 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 select-none mt-auto", className)}>
      {/* Top Category Switcher: Bilingual ("Photo" / "Foto" & "Certificate" / "Sertifikat") */}
      <div className="flex items-center justify-between gap-2 h-7 max-h-7 shrink-0">
        <div className="flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
          {hasPhotos && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedCategory("photo")
              }}
              className={cn(
                "px-2.5 py-0.5 rounded-md font-mono text-[10px] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap",
                selectedCategory === "photo"
                  ? "bg-background text-foreground shadow-2xs font-bold"
                  : "text-zinc-500 hover:text-foreground font-medium"
              )}
            >
              <ImageIcon className="size-3 shrink-0" />
              <span>{isEn ? "Photo" : "Foto"}</span>
            </button>
          )}

          {hasCerts && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedCategory("certificate")
              }}
              className={cn(
                "px-2.5 py-0.5 rounded-md font-mono text-[10px] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap",
                selectedCategory === "certificate"
                  ? "bg-background text-foreground shadow-2xs font-bold"
                  : "text-zinc-500 hover:text-foreground font-medium"
              )}
            >
              <Award className="size-3 shrink-0" />
              <span>{isEn ? "Certificate" : "Sertifikat"}</span>
            </button>
          )}
        </div>

        {/* Category Slide counter if more than 1 item in the active category */}
        {currentCategorySlides.length > 1 ? (
          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 shrink-0">
            {currentSlideIndex + 1} / {currentCategorySlides.length}
          </span>
        ) : (
          <div className="h-4" aria-hidden="true" />
        )}
      </div>

      {/* Embedded Visual Preview Container (Equal fixed height: h-36 sm:h-40) */}
      <div
        onClick={handlePreviewClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "group relative w-full h-36 sm:h-40 shrink-0 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/70 dark:bg-zinc-950/60 overflow-hidden flex flex-col justify-between p-3 transition-all duration-150 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-2xs select-none",
          currentCategorySlides.length > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
        )}
        title={isEn ? "Click to view full size" : "Klik untuk memperbesar / melihat ukuran penuh"}
      >
        {/* Animated Slide Viewport */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${selectedCategory}-${currentSlideIndex}`}
            initial={{ opacity: 0, x: slideDirection * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideDirection * 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute inset-0 size-full flex flex-col items-center justify-center p-3 pointer-events-none"
          >
            {(() => {
              const previewImg = getPreviewImage(activeSlide)
              const hasRawMedia = activeSlide?.image || activeSlide?.url
              if (previewImg) {
                return (
                  <>
                    <NextImage
                      src={previewImg}
                      alt={activeSlide.title}
                      fill
                      unoptimized
                      className={cn(
                        "object-cover transition-transform duration-300 group-hover:scale-102",
                        isCertificate ? "object-top" : "object-center"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
                    <div className="relative z-10 mt-auto text-left w-full text-white">
                      <span className="font-mono text-xs font-semibold line-clamp-1 drop-shadow-xs">
                        {activeSlide.title}
                      </span>
                    </div>
                  </>
                )
              }
              if (hasRawMedia) {
                return (
                  <div className="relative size-full flex flex-col justify-between p-3.5 rounded-lg bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 font-mono text-[9px] font-bold tracking-wider uppercase">
                        <FileText className="size-3" />
                        <span>PDF</span>
                      </div>
                      <span className="font-mono text-[9px] text-zinc-400">
                        {isCertificate ? (isEn ? "Certificate" : "Sertifikat") : "Document"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 text-left my-auto">
                      <span className="font-sans text-xs font-bold text-foreground line-clamp-2 leading-snug">
                        {activeSlide.title}
                      </span>
                      {activeSlide.caption && (
                        <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                          {activeSlide.caption}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
                      <span>{isEn ? "Click to view document" : "Klik untuk melihat dokumen"}</span>
                    </div>
                  </div>
                )
              }
              return (
                <>
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center w-full px-4">
                    <div className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background/90 text-zinc-500 dark:text-zinc-400 shadow-2xs">
                      {isCertificate ? (
                        <Award className="size-5" />
                      ) : (
                        <ImageIcon className="size-5" />
                      )}
                    </div>
                    <span className="font-mono text-xs font-semibold text-foreground line-clamp-1">
                      {activeSlide?.title}
                    </span>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Top-Right Expand Icon */}
        <div className="absolute top-2.5 right-2.5 z-20 p-1 rounded-md bg-background/80 border border-zinc-200 dark:border-zinc-800 text-zinc-400 group-hover:text-foreground transition-colors pointer-events-none shadow-2xs">
          <Maximize2 className="size-3" />
        </div>

        {/* In-Card Slide Navigation Chevrons (< and >) if multiple items */}
        {currentCategorySlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={isEn ? "Previous photo" : "Item sebelumnya"}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/20 transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer pointer-events-auto"
            >
              <ChevronLeft className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={isEn ? "Next photo" : "Item selanjutnya"}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/20 transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer pointer-events-auto"
            >
              <ChevronRight className="size-3.5" />
            </button>

            {/* Pagination Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 pointer-events-auto">
              {currentCategorySlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSlideDirection(i > currentSlideIndex ? 1 : -1)
                    if (selectedCategory === "photo") {
                      setPhotoIndex(i)
                    } else {
                      setCertIndex(i)
                    }
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                    currentSlideIndex === i
                      ? "w-4 bg-foreground dark:bg-white"
                      : "w-1.5 bg-zinc-400/50 hover:bg-zinc-400"
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
