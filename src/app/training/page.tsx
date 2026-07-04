"use client"

import React from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { training } from "@/data/career"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TrainingArchive() {
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
              className="w-fit border-zinc-200 dark:border-zinc-800 py-1.5 px-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
            >
              Complete Archive
            </Badge>
            <h1 className="text-3xl font-sans font-semibold tracking-tight text-foreground">
              Training & Workshops
            </h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400 font-sans font-normal leading-8">
              A comprehensive archive of all my middle-level management training courses, leadership workshops, and science writing certifications.
            </p>
          </div>

          {/* Grid list of all training */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {training.map((t) => (
              <Card 
                key={t.id} 
                className="border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 flex flex-col justify-between text-left gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold uppercase">{t.role}</span>
                    <span>{t.period}</span>
                  </div>

                  <div>
                    <h2 className="font-sans text-xl font-medium text-foreground leading-tight">
                      {t.title}
                    </h2>
                  </div>

                  <p className="font-sans text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
                    {t.summary}
                  </p>

                  {t.bullets && t.bullets.length > 0 && (
                    <ul className="list-disc pl-4 text-sm text-zinc-500/80 dark:text-zinc-400/80 flex flex-col gap-1.5 leading-relaxed mt-2">
                      {t.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
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
