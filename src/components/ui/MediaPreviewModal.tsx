"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ExternalLink, Download, FileText, Image as ImageIcon, Video as VideoIcon } from "lucide-react"
import { MediaItem } from "@/types/experience"
import NextImage from "next/image"

interface MediaPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  item: MediaItem | null
}

export default function MediaPreviewModal({ isOpen, onClose, item }: MediaPreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!item) return null

  const isPdf = item.type === "document" || item.url.toLowerCase().endsWith(".pdf")
  const isVideo = item.type === "video" || item.url.toLowerCase().endsWith(".mp4") || item.url.toLowerCase().endsWith(".webm")

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/60">
              <div className="flex items-center gap-2.5 min-w-0">
                {isPdf ? (
                  <FileText className="size-4 text-emerald-400 shrink-0" />
                ) : isVideo ? (
                  <VideoIcon className="size-4 text-blue-400 shrink-0" />
                ) : (
                  <ImageIcon className="size-4 text-zinc-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold font-sans text-zinc-100 truncate">
                    {item.title || (isPdf ? "Document Preview" : isVideo ? "Video Showcase" : "Media Preview")}
                  </h3>
                  {item.caption && (
                    <p className="text-[11px] font-mono text-zinc-400 truncate">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="size-4" />
                </a>
                <a
                  href={item.url}
                  download
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                  title="Download File"
                >
                  <Download className="size-4" />
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors ml-1 cursor-pointer"
                  title="Close preview (Esc)"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-auto bg-zinc-950 p-2 sm:p-4 flex items-center justify-center min-h-[300px]">
              {isPdf ? (
                <div className="w-full h-[75vh] flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <iframe
                    src={`${item.url}#view=FitH`}
                    className="w-full h-full border-none"
                    title={item.title || "PDF Document Viewer"}
                  />
                </div>
              ) : isVideo ? (
                <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-xl overflow-hidden bg-black border border-zinc-800">
                  <video
                    src={item.url}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[72vh] w-auto max-w-full rounded-lg"
                  />
                </div>
              ) : (
                <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-xl overflow-hidden">
                  <NextImage
                    src={item.url}
                    alt={item.title || "Preview image"}
                    width={1200}
                    height={800}
                    unoptimized
                    className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg border border-zinc-800 shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Footer details */}
            {item.caption && (
              <div className="px-5 py-2.5 bg-zinc-900/40 border-t border-zinc-800 text-xs text-zinc-400 font-sans flex items-center justify-between">
                <span>{item.caption}</span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  {isPdf ? "PDF DOCUMENT" : isVideo ? "VIDEO STREAM" : "IMAGE ARTIFACT"}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
