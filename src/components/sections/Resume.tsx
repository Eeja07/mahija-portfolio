"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Download, FileText } from "lucide-react"
import { resumeMetadata } from "@/data/resume"

export default function Resume() {
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
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-12 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Documents
          </Badge>
          <h2 
            id="resume-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Resume
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Download standard copies of my professional background in English or Indonesian.
          </p>
        </div>

        {/* Compact Resume CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="border border-border bg-card/25 shadow-sm overflow-hidden">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Left Side: Title */}
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-muted/30 border border-border/40 rounded-lg text-muted-foreground" aria-hidden="true">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-bold text-foreground">
                      Professional Curriculum Vitae
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5 leading-normal">
                      Single-page formatted PDF tailored for engineering roles.
                    </p>
                  </div>
                </div>

                {/* Right Side: Direct download links */}
                <div className="flex flex-wrap gap-2.5 w-full sm:w-auto shrink-0 select-none">
                  {/* English Resume */}
                  <a
                    href={resumeMetadata.english.file}
                    download={`Mahija_Resume_${resumeMetadata.english.language}.pdf`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-none border-none justify-center px-4 py-2 flex items-center gap-1.5 cursor-pointer text-xs"
                    )}
                  >
                    <Download className="size-3.5" />
                    <span>English PDF</span>
                  </a>

                  {/* Resume Indonesia */}
                  <a
                    href={resumeMetadata.indonesian.file}
                    download={`Mahija_Resume_${resumeMetadata.indonesian.language}.pdf`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full sm:w-auto border-border text-xs hover:bg-muted font-medium justify-center px-4 py-2 flex items-center gap-1.5 cursor-pointer"
                    )}
                  >
                    <Download className="size-3.5" />
                    <span>Indonesia PDF</span>
                  </a>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
