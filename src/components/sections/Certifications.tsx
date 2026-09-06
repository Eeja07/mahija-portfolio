"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getCertifications } from "@/data/certifications"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import SectionCardSlider from "@/components/ui/SectionCardSlider"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

export default function Certifications() {
  const { language } = useLanguage()
  const t = translations[language].certifications
  const certList = getCertifications(language)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <Badge
              variant="outline"
              className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
            >
              {t.badge}
            </Badge>
          </div>
          <h2
            id="certifications-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Horizontal Slider: Exactly 3 cards visible on desktop */}
        <SectionCardSlider>
          {certList.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.16 }}
              className="h-full flex flex-col"
            >
              <NetworkSubsystemNode
                status="healthy"
                className="h-full flex flex-col justify-between text-left gap-5 border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-3">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {cert.category}
                    </span>
                    <span>{cert.period}</span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug flex items-start gap-2 line-clamp-2">
                      <Award className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-1" />
                      <span>{cert.title}</span>
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {cert.summary}
                  </p>

                  {/* Verified Skills */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background/80 flex items-center gap-1"
                        >
                          <CheckCircle2 className="size-2.5 text-zinc-500 dark:text-zinc-400" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Visual Preview Slot */}
                <CardMediaPreview
                  activeType="certificate"
                  certificateTitle={cert.certificatePlaceholder.title}
                  certificateCaption={cert.certificatePlaceholder.caption}
                  contextTitle={`${cert.issuer} • ${cert.period}`}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </SectionCardSlider>
      </div>

      {/* Interactive Media & Document Preview Lightbox Modal */}
      <MediaPreviewModal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        item={previewItem}
      />
    </section>
  )
}
