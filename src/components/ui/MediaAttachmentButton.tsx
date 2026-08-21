"use client"

import React from "react"
import { MediaItem } from "@/types/experience"
import { Image as ImageIcon, Video, Award } from "lucide-react"
import NextImage from "next/image"

interface MediaAttachmentButtonProps {
  media?: MediaItem[]
  certificateUrl?: string
  certificateLabel?: string
  onSelectMedia: (item: MediaItem) => void
  className?: string
}

export default function MediaAttachmentButton({
  media,
  certificateUrl,
  certificateLabel = "Preview Certificate",
  onSelectMedia,
  className = "",
}: MediaAttachmentButtonProps) {
  if ((!media || media.length === 0) && !certificateUrl) return null

  const imageItems = media?.filter((m) => m.type === "image") || []
  const videoItems = media?.filter((m) => m.type === "video") || []

  return (
    <div className={`flex flex-col gap-2.5 pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 select-none ${className}`}>
      {/* Visual Thumbnail Strip */}
      {imageItems.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {imageItems.slice(0, 3).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectMedia(img)}
              className="group relative size-12 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shrink-0 hover:border-blue-500/80 transition-all focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
              title={img.title || "Click to preview image"}
            >
              <NextImage
                src={img.thumbnail || img.url}
                alt={img.title || "Thumbnail"}
                width={48}
                height={48}
                unoptimized
                className="size-full object-cover group-hover:scale-110 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="size-3.5 text-white" />
              </div>
            </button>
          ))}
          {imageItems.length > 3 && (
            <button
              type="button"
              onClick={() => onSelectMedia(imageItems[3])}
              className="size-12 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100/60 dark:bg-zinc-900/60 flex items-center justify-center font-mono text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-foreground shrink-0 cursor-pointer"
            >
              +{imageItems.length - 3}
            </button>
          )}
        </div>
      )}

      {/* Action Pills & Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Certificate Button */}
        {certificateUrl && (
          <button
            type="button"
            onClick={() =>
              onSelectMedia({
                type: "document",
                url: certificateUrl,
                title: certificateLabel,
                caption: "Official Credential & Verification Document",
              })
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-medium transition-colors cursor-pointer"
          >
            <Award className="size-3.5 shrink-0" />
            <span>{certificateLabel}</span>
          </button>
        )}

        {/* Video Attachment Button */}
        {videoItems.map((vid, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectMedia(vid)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-medium transition-colors cursor-pointer"
          >
            <Video className="size-3.5 shrink-0" />
            <span>{vid.title || "Watch Video"}</span>
          </button>
        ))}

        {/* Media count pills if only image is available without thumbnail */}
        {imageItems.length > 0 && imageItems.length <= 1 && (
          <button
            type="button"
            onClick={() => onSelectMedia(imageItems[0])}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-mono text-[11px] font-medium transition-colors cursor-pointer"
          >
            <ImageIcon className="size-3.5 shrink-0" />
            <span>{imageItems[0].title || "View Photo"}</span>
          </button>
        )}
      </div>
    </div>
  )
}
