"use client"

import React from "react"
import { MediaItem } from "@/types/experience"
import { Image as ImageIcon, Award, ExternalLink } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

interface MediaAttachmentButtonProps {
  photoTitle?: string
  photoCaption?: string
  certificateTitle?: string
  certificateCaption?: string
  instagramUrl?: string
  instagramLabel?: string
  contextTitle?: string
  onSelectMedia: (item: MediaItem) => void
  className?: string
  showPhoto?: boolean
  showCertificate?: boolean
}

export default function MediaAttachmentButton({
  photoTitle,
  photoCaption,
  certificateTitle,
  certificateCaption,
  instagramUrl,
  instagramLabel,
  contextTitle,
  onSelectMedia,
  className = "",
  showPhoto = true,
  showCertificate = true,
}: MediaAttachmentButtonProps) {
  const { language } = useLanguage()
  const isEn = language === "en"

  const defaultPhotoTitle = photoTitle || (isEn ? "Photo / Documentation" : "Foto / Dokumentasi Kegiatan")
  const defaultPhotoCaption = photoCaption || (isEn ? "Placeholder slot for photos or activity records." : "Slot placeholder untuk dokumentasi foto atau rekaman kegiatan.")
  const defaultCertTitle = certificateTitle || (isEn ? "Certificate / Official Letter" : "Sertifikat / Surat Keterangan")
  const defaultCertCaption = certificateCaption || (isEn ? "Placeholder slot for official certificates, decrees, or credentials." : "Slot placeholder untuk sertifikat resmi, surat tugas, atau surat keputusan.")
  const defaultInstagramLabel = instagramLabel || (isEn ? "Instagram Post" : "Postingan Instagram")

  return (
    <div className={`flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 select-none ${className}`}>
      {/* 1. Photo Placeholder Button */}
      {showPhoto && (
        <button
          type="button"
          onClick={() =>
            onSelectMedia({
              type: "placeholder",
              category: "photo",
              isPlaceholder: true,
              title: defaultPhotoTitle,
              caption: defaultPhotoCaption,
              contextTitle,
            })
          }
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
          title={isEn ? "Preview photo / documentation slot" : "Pratinjau slot foto / dokumentasi"}
        >
          <ImageIcon className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span>{isEn ? "Photo" : "Foto"}</span>
        </button>
      )}

      {/* 2. Certificate / Statement Letter Placeholder Button */}
      {showCertificate && (
        <button
          type="button"
          onClick={() =>
            onSelectMedia({
              type: "placeholder",
              category: "certificate",
              isPlaceholder: true,
              title: defaultCertTitle,
              caption: defaultCertCaption,
              contextTitle,
            })
          }
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
          title={isEn ? "Preview certificate / document slot" : "Pratinjau slot sertifikat / surat keterangan"}
        >
          <Award className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span>{isEn ? "Certificate / Letter" : "Sertifikat / Surat"}</span>
        </button>
      )}

      {/* 3. Instagram Direct Post Button (For Awards / Social) */}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 text-foreground font-mono text-[11px] font-medium transition-all duration-150 cursor-pointer ml-auto shadow-2xs group"
          title={isEn ? "Open related Instagram post" : "Buka postingan Instagram terkait"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 shrink-0 text-foreground group-hover:text-foreground transition-colors">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span>{defaultInstagramLabel}</span>
          <ExternalLink className="size-3 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
        </a>
      )}
    </div>
  )
}
