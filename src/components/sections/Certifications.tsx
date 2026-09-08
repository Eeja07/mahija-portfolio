"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getCertifications } from "@/data/certifications"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { SpatialCableBranch } from "@/components/network/SpatialCableBranch"
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
        <div className="flex flex-col gap-3 mb-10 text-center md:text-left items-center md:items-start max-w-3xl mx-auto md:mx-0">
          <h2
            id="certifications-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground text-center md:text-left"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed text-center md:text-left mx-auto md:mx-0">
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
              className="flex-1 w-full flex flex-col self-stretch h-full"
            >
              <NetworkSubsystemNode
                status="healthy"
                className="flex-1 w-full flex flex-col justify-between text-left gap-4 sm:gap-5 p-5 sm:p-6 h-[400px] sm:h-[410px] self-stretch"
              >
                <div className="flex-1 flex flex-col gap-3">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {cert.category}
                    </span>
                    <span>{cert.period}</span>
                  </div>

                  {/* Title & Issuer */}
                  <div className="min-h-[3.25rem] flex flex-col justify-start">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug flex items-start gap-2 line-clamp-2">
                      <Award className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-1" />
                      <span>{cert.title}</span>
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </p>
                  </div>

                  {/* Verified Skills */}
                  <div className="flex flex-wrap gap-1.5 pt-1 min-h-[1.75rem]">
                    {cert.skills && (
                      <>
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background/80 flex items-center gap-1"
                          >
                            <CheckCircle2 className="size-2.5 text-zinc-500 dark:text-zinc-400" />
                            <span className="truncate max-w-[140px]">{skill}</span>
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded font-mono text-[10px] text-zinc-400 bg-background/50">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Direct Visual Preview Slot (Multi-slide enabled) */}
                <CardMediaPreview
                  activeType="certificate"
                  slides={[
                    {
                      type: "certificate",
                      title: cert.certificatePlaceholder.title,
                    },
                    {
                      type: "certificate",
                      title: language === "en" ? `${cert.title} — Score Sheet & Verification` : `${cert.title} — Lembar Skor & Verifikasi`,
                    },
                  ]}
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

      {/* Animated Packet Stream Section Divider */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-12 sm:mt-16">
        <SpatialCableBranch direction="left-to-right" label={t.cableLabel} status="transmitting" />
      </div>
    </section>
  )
}
