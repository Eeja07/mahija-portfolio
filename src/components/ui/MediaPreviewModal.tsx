"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Image as ImageIcon, Award, FileText, ShieldCheck } from "lucide-react"
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

  const isPlaceholder = item.isPlaceholder || !item.url || item.type === "placeholder"
  const isCertificate = item.type === "certificate" || item.category === "certificate"
  const isDocument = item.type === "document" || item.category === "document"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="relative z-10 w-full max-w-xl bg-background border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden flex flex-col text-foreground font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60">
              <div className="flex items-center gap-2.5 min-w-0">
                {isCertificate ? (
                  <Award className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : isDocument ? (
                  <FileText className="size-4 text-blue-600 dark:text-blue-400 shrink-0" />
                ) : (
                  <ImageIcon className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <h3 className="text-sm font-bold tracking-tight text-foreground truncate">
                    {item.title || "Preview Slot"}
                  </h3>
                  {item.contextTitle && (
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                      {item.contextTitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Close preview (Esc)"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex flex-col gap-4">
              {isPlaceholder ? (
                <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-900/40 text-center gap-3">
                  <div className="size-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background flex items-center justify-center text-zinc-500 dark:text-zinc-400 shadow-2xs">
                    {isCertificate ? (
                      <Award className="size-6 text-emerald-600 dark:text-emerald-400" />
                    ) : isDocument ? (
                      <FileText className="size-6 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <ImageIcon className="size-6 text-zinc-500 dark:text-zinc-400" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1 max-w-sm">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      {isCertificate ? "Slot Sertifikat / Surat Keterangan" : "Slot Foto / Dokumentasi"}
                    </span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.caption || "Placeholder slot untuk dokumentasi visual atau verifikasi dokumen resmi."}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background font-mono text-[10px] text-zinc-500 dark:text-zinc-400 mt-2">
                    <ShieldCheck className="size-3 text-emerald-500" />
                    <span>Slot Siap / Ready for Upload</span>
                  </div>
                </div>
              ) : item.url && (
                <div className="relative w-full max-h-[60vh] flex items-center justify-center rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950">
                  <NextImage
                    src={item.url}
                    alt={item.title || "Preview"}
                    width={800}
                    height={500}
                    unoptimized
                    className="max-h-[55vh] w-auto max-w-full object-contain rounded-lg"
                  />
                </div>
              )}

              {/* Context Footer Note */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span>{item.category ? item.category.toUpperCase() : "MEDIA SLOT"}</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Tutup [Esc]
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
