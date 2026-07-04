"use client"

import React from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { experiences } from "@/data/experience"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExperienceArchive() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground animate-in fade-in duration-200">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="flex-1 w-full py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col gap-3 mb-12 text-left max-w-3xl">
            <Badge 
              variant="outline" 
              className="w-fit border-border py-1.5 px-3 bg-card/40 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none"
            >
              Complete Archive
            </Badge>
            <h1 className="text-3xl font-sans font-semibold tracking-tight text-foreground">
              Work Experience History
            </h1>
            <p className="text-base text-muted-foreground font-sans font-normal leading-8">
              A comprehensive archive of all my professional internships, teaching appointments, and lab coordination roles.
            </p>
          </div>

          {/* Grid list of all experiences */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <Card 
                key={exp.id} 
                className="border border-border bg-card/40 rounded-2xl p-6 flex flex-col justify-between text-left gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-sm text-muted-foreground">
                    <span className="font-semibold uppercase">{exp.category}</span>
                    <span>{exp.startDate} &mdash; {exp.endDate || "Present"}</span>
                  </div>

                  <div>
                    <h2 className="font-sans text-xl font-medium text-foreground leading-tight">
                      {exp.role}
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground mt-1">
                      {exp.company}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground/80 mt-0.5">
                      {exp.location}
                    </p>
                  </div>

                  <p className="font-sans text-base text-muted-foreground font-normal leading-relaxed mt-1">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc pl-4 text-sm text-muted-foreground/80 flex flex-col gap-1.5 leading-relaxed mt-2">
                      {exp.achievements.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border select-none">
                  {exp.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="border border-border px-3 py-1.5 font-mono text-sm text-muted-foreground bg-card/40"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
