"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Download, Printer, FileText, Check, Globe } from "lucide-react"
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
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  }

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.print()
  }

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="w-full py-20 bg-background border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-[11px] uppercase tracking-wider select-none"
          >
            Curriculum Vitae
          </Badge>
          <h2 
            id="resume-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Resume
          </h2>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            Access, download, or print copies of my professional background in English or Indonesian.
          </p>
        </div>

        {/* Resume CTA Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <motion.div variants={itemVariants}>
            <Card className="border border-border bg-card/40 shadow-sm overflow-hidden">
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                
                {/* Left Side: Metadata and Badging */}
                <div className="flex flex-col gap-3.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2 select-none">
                    <Badge 
                      variant="secondary"
                      className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
                    >
                      {resumeMetadata.version}
                    </Badge>
                    {resumeMetadata.atsFriendly && (
                      <Badge 
                        variant="outline"
                        className="border-border text-muted-foreground px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1"
                      >
                        <Check className="size-3 text-emerald-500" />
                        ATS Friendly
                      </Badge>
                    )}
                    
                    {/* Resume Language Indicators */}
                    <Badge 
                      variant="outline"
                      className="border-border text-muted-foreground px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Globe className="size-3 text-primary" />
                      {resumeMetadata.english.language} / {resumeMetadata.indonesian.language}
                    </Badge>

                    <span className="text-[11px] font-mono text-muted-foreground/80">
                      Updated {resumeMetadata.updated}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-muted/30 border border-border/40 rounded-lg text-muted-foreground" aria-hidden="true">
                      <FileText className="size-5" />
                    </div>
                    <CardTitle className="font-sans text-lg font-bold text-foreground">
                      Professional Resume PDF
                    </CardTitle>
                  </div>

                  <CardDescription className="text-xs text-muted-foreground font-sans leading-relaxed">
                    Designed for automated scanner parsing and quick recruiter review. Optimized to print on a single page using standard letter dimensions. Available in English (EN) and Indonesian (ID).
                  </CardDescription>
                </div>

                {/* Right Side: Action Triggers (Desktop: inline, Mobile: stacked) */}
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto shrink-0 select-none">
                  
                  {/* English Resume (Primary) */}
                  <a
                    href={resumeMetadata.english.file}
                    download={`Mahija_Resume_${resumeMetadata.english.language}.pdf`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-none border-none justify-center px-5 py-2.5 h-10 flex items-center"
                    )}
                  >
                    <Download className="size-3.5 mr-2" />
                    {resumeMetadata.english.label}
                  </a>

                  {/* Resume Indonesia (Outline) */}
                  <a
                    href={resumeMetadata.indonesian.file}
                    download={`Mahija_Resume_${resumeMetadata.indonesian.language}.pdf`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full md:w-auto border-border text-xs hover:bg-muted font-medium justify-center px-5 py-2.5 h-10 flex items-center"
                    )}
                  >
                    <Download className="size-3.5 mr-2" />
                    {resumeMetadata.indonesian.label}
                  </a>

                  {/* Print Resume (Ghost) */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrint}
                    className="w-full md:w-auto text-xs text-muted-foreground hover:text-foreground font-medium justify-center px-5 py-2.5 h-10"
                  >
                    <Printer className="size-3.5 mr-2" />
                    Print Resume
                  </Button>

                </div>

              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
