"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { getExperiences } from "@/data/experience"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { ArrowRight, Briefcase } from "lucide-react"
import { MediaItem } from "@/types/experience"
import MediaPreviewModal from "@/components/ui/MediaPreviewModal"
import SectionCardSlider from "@/components/ui/SectionCardSlider"
import CardMediaPreview from "@/components/ui/CardMediaPreview"

export default function Experience() {
  const { language } = useLanguage()
  const t = translations[language].experience
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const allExperiences = getExperiences(language)

  const getExperienceImage = (id: string): string | undefined => {
    if (id === "robotics-extracurricular-instructor") return "/images/activities/robot-assembly-1.png"
    if (id === "lintasarta-intern") return "/images/evidence/tunnel.webp"
    if (id === "winnicode-garuda-intern") return "/images/featured/untern/home.webp"
    if (id === "dsp-lab-course-ta") return "/images/activities/iot-dashboard-screenshot.png"
    return undefined
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
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
            id="experience-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Horizontal Slider: Exactly 3 cards visible on desktop, swipeable to reveal the rest */}
        <SectionCardSlider>
          {allExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.16 }}
              className="h-full flex flex-col"
            >
              <NetworkSubsystemNode
                status={idx === 0 ? "transmitting" : "healthy"}
                className="h-full flex flex-col justify-between text-left gap-5 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      {exp.startDate} &ndash; {exp.current ? "Present" : exp.endDate}
                    </span>
                    <span className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-[10px] bg-background">
                      {exp.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground tracking-tight leading-snug line-clamp-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                      <Briefcase className="size-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <span className="truncate">{exp.company}</span>
                      <span className="text-zinc-400 shrink-0">&bull;</span>
                      <span className="font-normal text-zinc-500 shrink-0">{exp.location}</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1 select-none">
                    {exp.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-background"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Visual Preview Slot (Elongates card downward & previews directly) */}
                <CardMediaPreview
                  photoTitle={exp.photoPlaceholder?.title || `${exp.role} — Foto Dokumentasi`}
                  photoCaption={exp.photoPlaceholder?.caption}
                  photoImage={getExperienceImage(exp.id)}
                  certificateTitle={exp.certificatePlaceholder?.title || `${exp.role} — Sertifikat / Surat Keterangan`}
                  certificateCaption={exp.certificatePlaceholder?.caption}
                  contextTitle={`${exp.company} • ${exp.startDate} - ${exp.endDate || (language === "id" ? "Sekarang" : "Present")}`}
                  onSelectMedia={(selected) => setPreviewItem(selected)}
                />
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </SectionCardSlider>

        {/* View All Experience Link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/experience"
            className="group inline-flex items-center gap-2.5 font-mono text-xs font-semibold px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-foreground hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-foreground group-hover:scale-125 transition-all" />
            <span>{t.viewAll}</span>
            <ArrowRight className="size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </a>
        </div>
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
