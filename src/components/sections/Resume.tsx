"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ExternalLink, Printer, FileText, Check } from "lucide-react"
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
            Access, download, or print a copy of my professional background for offline review.
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
                      v{resumeMetadata.version}
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
                    Designed for automated scanner parsing and quick recruiter review. Optimized to print on a single page using standard letter dimensions.
                  </CardDescription>
                </div>

                {/* Right Side: Action Triggers */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 select-none">
                  
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full md:w-48 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-none border-none justify-center"
                    render={
                      <a href={resumeMetadata.pdfPath} download={`Mahija_Resume_v${resumeMetadata.version}.pdf`}>
                        <Download className="size-3.5 mr-2" />
                        {resumeMetadata.downloadLabel}
                      </a>
                    }
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full md:w-48 border-border text-xs hover:bg-muted font-medium justify-center"
                    render={
                      <a href={resumeMetadata.pdfPath} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-3.5 mr-2" />
                        {resumeMetadata.openLabel}
                      </a>
                    }
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="w-full md:w-48 border-border text-xs hover:bg-muted font-medium justify-center"
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
