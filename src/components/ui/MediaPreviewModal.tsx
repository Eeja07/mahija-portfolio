"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Image as ImageIcon, Award, FileText, ShieldCheck, Download, ExternalLink } from "lucide-react"
import { MediaItem } from "@/types/experience"
import NextImage from "next/image"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"

interface MediaPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  item: MediaItem | null
}

export default function MediaPreviewModal({ isOpen, onClose, item }: MediaPreviewModalProps) {
  const { language } = useLanguage()
  const isEn = language === "en"

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
  const isPdf = !!item.url && item.url.toLowerCase().endsWith(".pdf")
  const isCertificate = item.type === "certificate" || item.category === "certificate"
  const isDocument = item.type === "document" || item.category === "document" || isPdf

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 select-none">
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
            className={cn(
              "relative z-10 w-full bg-background border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-foreground font-sans max-h-[90vh]",
              isDocument ? "max-w-3xl sm:max-w-4xl" : "max-w-xl"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 shrink-0">
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
                  {item.caption && (
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.url && (
                  <>
                    <a
                      href={item.url}
                      download
                      className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-foreground text-background text-xs font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                      title={isEn ? "Download file" : "Unduh berkas"}
                    >
                      <Download className="size-3" />
                      <span>{isEn ? "Download" : "Unduh"}</span>
                    </a>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-foreground text-xs font-mono font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title={isEn ? "Open in new tab" : "Buka di tab baru"}
                    >
                      <ExternalLink className="size-3" />
                      <span>{isEn ? "New Tab" : "Tab Baru"}</span>
                    </a>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title={isEn ? "Close preview (Esc)" : "Tutup pratinjau (Esc)"}
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto">
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
                      {isCertificate ? (isEn ? "Certificate / Official Document Slot" : "Slot Sertifikat / Surat Keterangan") : (isEn ? "Photo / Documentation Slot" : "Slot Foto / Dokumentasi")}
                    </span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.caption || (isEn ? "Placeholder slot for visual documentation or official credential verification." : "Slot placeholder untuk dokumentasi visual atau verifikasi dokumen resmi.")}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background font-mono text-[10px] text-zinc-500 dark:text-zinc-400 mt-2">
                    <ShieldCheck className="size-3 text-emerald-500" />
                    <span>{isEn ? "Ready for Upload" : "Slot Siap Diunggah"}</span>
                  </div>
                </div>
              ) : isPdf ? (
                <div className="relative w-full h-[65vh] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex flex-col">
                  <object
                    data={`${item.url}#toolbar=0&navpanes=0`}
                    type="application/pdf"
                    className="w-full h-full border-0 bg-white dark:bg-zinc-900"
                  >
                    <iframe
                      src={`${item.url}#toolbar=0&navpanes=0`}
                      title={item.title || "PDF Document"}
                      className="w-full h-full border-0 bg-white dark:bg-zinc-900"
                    />
                  </object>
                </div>
              ) : item.url && (
                <div className="relative w-full max-h-[60vh] flex items-center justify-center rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/60 p-2">
                  <NextImage
                    src={item.url}
                    alt={item.title || "Preview"}
                    width={800}
                    height={500}
                    unoptimized
                    className="max-h-[55vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
                  />
                </div>
              )}

              {/* Context Footer Note */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span>{item.category ? item.category.toUpperCase() : isPdf ? "DOCUMENT / PDF" : "MEDIA SLOT"}</span>
                
                <div className="flex items-center gap-3">
                  {item.url && (
                    <a
                      href={item.url}
                      download
                      className="sm:hidden text-foreground underline"
                    >
                      Download
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="hover:text-foreground transition-colors cursor-pointer"
                  >
                    Tutup [Esc]
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
