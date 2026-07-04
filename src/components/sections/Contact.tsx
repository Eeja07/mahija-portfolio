"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Inline SVGs for self-contained robustness
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 7h10v10M7 17 17 7" />
  </svg>
)

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

interface ContactChannel {
  name: string
  handle: string
  href: string
  icon: React.ReactNode
}

const contactChannels: ContactChannel[] = [
  {
    name: "Email",
    handle: "mahijapradipta86@gmail.com",
    href: "mailto:mahijapradipta86@gmail.com",
    icon: <MailIcon className="size-4 animate-pulse" />,
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/mahijaibad",
    href: "https://linkedin.com/in/mahijaibad",
    icon: <LinkedinIcon className="size-4" />,
  },
  {
    name: "GitHub",
    handle: "github.com/eeja07",
    href: "https://github.com/eeja07",
    icon: <GithubIcon className="size-4" />,
  },
  {
    name: "WhatsApp",
    handle: "+62 812-8809-2766",
    href: "https://wa.me/6281288092766",
    icon: <MessageSquareIcon className="size-4" />,
  },
]

export default function Contact() {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null)

  const handleCopy = async (value: string, name: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedChannel(name)
      setTimeout(() => {
        setCopiedChannel(null)
      }, 2000)
    } catch (err) {
      console.error("Failed to copy handles: ", err)
    }
  }

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

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-20 bg-background border-t border-zinc-800"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <Badge 
            variant="outline" 
            className="w-fit border-zinc-800 py-1.5 px-3 bg-zinc-950/40 text-zinc-400 font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Connection Channels
          </Badge>
          <h2 
            id="contact-heading"
            className="text-3xl font-sans font-semibold tracking-tight text-zinc-50"
          >
            Get in Touch
          </h2>
          <p className="text-base text-zinc-400 font-sans font-normal leading-8">
            Reach out through any of these communication channels.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactChannels.map((channel) => (
            <motion.div key={channel.name} variants={itemVariants}>
              <Card className="border border-zinc-800 bg-zinc-950/40 rounded-2xl shadow-sm transition-all duration-150 ease-in-out hover:border-zinc-700 h-full flex flex-col justify-between p-6 text-left gap-4">
                <div className="flex flex-col gap-3">
                  <div className="p-2 w-fit bg-zinc-955 border border-zinc-800 rounded-lg text-zinc-400" aria-hidden="true">
                    {channel.icon}
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sans text-xl font-medium text-zinc-50 leading-tight">
                      {channel.name}
                    </h3>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-sm font-mono text-zinc-400 truncate flex-1" title={channel.handle}>
                        {channel.handle}
                      </span>
                      <button
                        onClick={() => handleCopy(channel.handle, channel.name)}
                        aria-label={`Copy ${channel.name} handle to clipboard`}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150 p-1 rounded hover:bg-zinc-800 shrink-0 cursor-pointer"
                      >
                        {copiedChannel === channel.name ? (
                          <span className="text-xs text-zinc-300 font-sans font-semibold" aria-live="polite">
                            Copied!
                          </span>
                        ) : (
                          <CopyIcon className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-zinc-800/60 select-none">
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full border-zinc-800 text-zinc-300 bg-zinc-950/40 hover:bg-zinc-800 font-medium justify-between cursor-pointer"
                    )}
                  >
                    <span>Connect</span>
                    <ArrowUpRightIcon className="size-3.5 ml-1.5 opacity-60" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
