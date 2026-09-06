"use client"

import React, { useState } from "react"
import NextImage from "next/image"
import { Image as ImageIcon, Award, Maximize2, ShieldCheck, Sparkles } from "lucide-react"
import { MediaItem } from "@/types/experience"
import { cn } from "@/lib/utils"

interface CardMediaPreviewProps {
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
  photoTitle = "Foto / Dokumentasi Kegiatan",
  photoCaption = "Slot pratinjau dokumentasi foto atau rekaman kegiatan.",
  photoImage,
  certificateTitle = "Sertifikat / Dokumen Resmi",
  certificateCaption = "Slot pratinjau sertifikat resmi, surat tugas, atau surat keputusan.",
  certificateImage,
  contextTitle,
  onSelectMedia,
  className = "",
  activeType: initialActiveType = "photo",
}: CardMediaPreviewProps) {
  const [activeTab, setActiveTab] = useState<"photo" | "certificate">(initialActiveType)

  const hasBoth = Boolean(photoTitle && certificateTitle)
  const currentImage = activeTab === "photo" ? photoImage : certificateImage
  const currentTitle = activeTab === "photo" ? photoTitle : certificateTitle
  const currentCaption = activeTab === "photo" ? photoCaption : certificateCaption
  const isCertificate = activeTab === "certificate"

  const handlePreviewClick = () => {
    onSelectMedia({
      type: currentImage ? (isCertificate ? "certificate" : "image") : "placeholder",
      category: isCertificate ? "certificate" : "photo",
      isPlaceholder: !currentImage,
      url: currentImage,
      title: currentTitle,
      caption: currentCaption,
      contextTitle,
    })
  }

  return (
    <div className={cn("w-full flex flex-col gap-2 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 select-none", className)}>
      {/* Tab Switcher if item has both photo and certificate */}
      {hasBoth && (
        <div className="flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 w-fit">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActiveTab("photo")
            }}
            className={cn(
              "px-2 py-0.5 rounded-md font-mono text-[10px] font-medium transition-all cursor-pointer flex items-center gap-1",
              activeTab === "photo"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-zinc-500 hover:text-foreground"
            )}
          >
            <ImageIcon className="size-3" />
            <span>Dokumentasi</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActiveTab("certificate")
            }}
            className={cn(
              "px-2 py-0.5 rounded-md font-mono text-[10px] font-medium transition-all cursor-pointer flex items-center gap-1",
              activeTab === "certificate"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-zinc-500 hover:text-foreground"
            )}
          >
            <Award className="size-3" />
            <span>Sertifikat</span>
          </button>
        </div>
      )}

      {/* Embedded Visual Preview Container (Directly Visible on Card) */}
      <div
        onClick={handlePreviewClick}
        className="group relative w-full h-32 sm:h-36 rounded-xl border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-50/70 dark:bg-zinc-950/60 overflow-hidden cursor-pointer flex flex-col justify-between p-3 transition-all duration-150 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-2xs"
        title="Klik untuk memperbesar / melihat ukuran penuh"
      >
        {currentImage ? (
          <>
            <NextImage
              src={currentImage}
              alt={currentTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-103"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
          </>
        ) : (
          /* High-Precision Engineering Schematic Viewport */
          <>
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between w-full">
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

            <div className="relative z-10 flex flex-col gap-0.5 mt-auto text-left">
              <span className="font-mono text-xs font-bold text-foreground line-clamp-1">
                {currentTitle}
              </span>
              <span className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {currentCaption}
              </span>
            </div>
          </>
        )}

        {/* Top/Bottom Badges when real image is present */}
        {currentImage && (
          <>
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/60 text-zinc-200 border border-white/10 backdrop-blur-xs flex items-center gap-1">
                <Sparkles className="size-2.5 text-zinc-300" />
                <span>PREVIEW</span>
              </span>

              <div className="p-1 rounded bg-black/60 text-zinc-200 border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="size-3" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-0.5 text-left text-white">
              <span className="font-mono text-xs font-bold line-clamp-1 text-zinc-100 drop-shadow-xs">
                {currentTitle}
              </span>
              <span className="font-sans text-[10px] line-clamp-1 text-zinc-300 drop-shadow-xs">
                {currentCaption}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
