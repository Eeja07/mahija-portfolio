"use client"

import React from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { committees } from "@/data/career"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CommitteesArchive() {
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
              className="w-fit border-zinc-800 py-1.5 px-3 bg-zinc-950/40 text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
            >
              Complete Archive
            </Badge>
            <h1 className="text-3xl font-sans font-semibold tracking-tight text-zinc-50">
              Committee Involvement
            </h1>
            <p className="text-base text-zinc-400 font-sans font-normal leading-8">
              A comprehensive archive of all my committee appointments, event coordinator, and systems logistics support.
            </p>
          </div>

          {/* Grid list of all committees */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((comm) => (
              <Card 
                key={comm.id} 
                className="border border-zinc-800 bg-zinc-950/40 rounded-2xl p-6 flex flex-col justify-between text-left gap-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-sm text-zinc-400">
                    <span className="font-semibold uppercase">Committee</span>
                    <span>{comm.period}</span>
                  </div>

                  <div>
                    <h2 className="font-sans text-xl font-medium text-zinc-50 leading-tight">
                      {comm.role}
                    </h2>
                    <p className="font-sans text-sm text-zinc-400 mt-1">
                      {comm.title}
                    </p>
                  </div>

                  <p className="font-sans text-base text-zinc-400 font-normal leading-relaxed">
                    {comm.summary}
                  </p>

                  {comm.bullets && comm.bullets.length > 0 && (
                    <ul className="list-disc pl-4 text-sm text-zinc-500 flex flex-col gap-1.5 leading-relaxed mt-2">
                      {comm.bullets.map((bullet, idx) => (
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
