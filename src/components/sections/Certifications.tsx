"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getCertifications } from "@/data/certifications"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"

export default function Certifications() {
  const { language } = useLanguage()
  const t = translations[language].certifications
  const certList = getCertifications(language)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.16,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left max-w-3xl">
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

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certList.map((cert) => (
            <motion.div key={cert.id} variants={itemVariants} className="h-full">
              <NetworkSubsystemNode
                status="healthy"
                className="h-full flex flex-col justify-between text-left gap-5 border-zinc-200/90 dark:border-zinc-800/90 p-6"
              >
                <div className="flex flex-col gap-3">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-primary">
                      {cert.category}
                    </span>
                    <span>{cert.period}</span>
                  </div>

                  {/* Title & Icon */}
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug flex items-start gap-2">
                      <Award className="size-4 text-primary shrink-0 mt-1" />
                      <span>{cert.title}</span>
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                      <span>{cert.issuer}</span>
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {cert.summary}
                  </p>

                  {/* Verified Skills */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background/80 flex items-center gap-1"
                        >
                          <CheckCircle2 className="size-2.5 text-primary" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preview Button */}
                <div className="pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewItem({
                        type: "placeholder",
                        category: "certificate",
                        isPlaceholder: true,
                        title: cert.certificatePlaceholder.title,
                        caption: cert.certificatePlaceholder.caption,
                        contextTitle: `${cert.issuer} • ${cert.period}`,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-primary/50 text-zinc-700 dark:text-zinc-300 hover:text-primary font-mono text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs group"
                  >
                    <ExternalLink className="size-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    <span>{language === "id" ? "Pratinjau Sertifikat" : "Preview Certificate"}</span>
                  </button>
                </div>
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </motion.div>
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
