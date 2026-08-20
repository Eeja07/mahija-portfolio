"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { NetworkSubsystemNode } from "@/components/network/NetworkSubsystemNode"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Copy, Check, Mail, MessageSquare } from "lucide-react"

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

interface ContactChannel {
  name: string
  handle: string
  href: string
  icon: React.ReactNode
  protocol: string
}

const contactChannels: ContactChannel[] = [
  {
    name: "Email",
    handle: "mahijapradipta86@gmail.com",
    href: "mailto:mahijapradipta86@gmail.com",
    icon: <Mail className="size-4" />,
    protocol: "Direct Email",
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/mahijaibad",
    href: "https://linkedin.com/in/mahijaibad",
    icon: <LinkedinIcon className="size-4" />,
    protocol: "LinkedIn Profile",
  },
  {
    name: "GitHub",
    handle: "github.com/eeja07",
    href: "https://github.com/eeja07",
    icon: <GithubIcon className="size-4" />,
    protocol: "GitHub Profile",
  },
  {
    name: "WhatsApp",
    handle: "+62 812-8809-2766",
    href: "https://wa.me/6281288092766",
    icon: <MessageSquare className="size-4" />,
    protocol: "WhatsApp Direct",
  },
]

export default function Contact() {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language].contact

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
        duration: 0.16,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-20 bg-transparent"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <Badge 
              variant="outline" 
              className="w-fit border-zinc-200 dark:border-zinc-800 py-1 px-3 bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-mono font-medium text-xs uppercase tracking-wider select-none shadow-xs"
            >
              {t.badge}
            </Badge>
          </div>
          <h2 
            id="contact-heading"
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            {t.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Contact Channels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactChannels.map((channel) => (
            <motion.div key={channel.name} variants={itemVariants} className="h-full">
              <NetworkSubsystemNode
                status="transmitting"
                className="h-full flex flex-col justify-between p-6 text-left gap-6"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 w-fit bg-background border border-zinc-200 dark:border-zinc-800 rounded-xl text-blue-600 dark:text-cyan-400 shadow-xs" aria-hidden="true">
                      {channel.icon}
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {channel.protocol}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans text-xl font-bold text-foreground tracking-tight leading-tight">
                      {channel.name}
                    </h3>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate flex-1" title={channel.handle}>
                        {channel.handle}
                      </span>
                      <button
                        onClick={() => handleCopy(channel.handle, channel.name)}
                        aria-label={`Copy ${channel.name} handle to clipboard`}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors duration-150 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 shrink-0 cursor-pointer"
                      >
                        {copiedChannel === channel.name ? (
                          <span className="font-mono text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                            <Check className="size-3" />
                            {t.copied}
                          </span>
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-zinc-200/70 dark:border-zinc-800/70 select-none">
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full border-zinc-200 dark:border-zinc-800 font-mono text-xs text-foreground bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium justify-between cursor-pointer rounded-xl"
                    )}
                  >
                    <span>{t.connect} &gt;&gt;</span>
                    <ArrowUpRight className="size-3.5 opacity-60" />
                  </a>
                </div>
              </NetworkSubsystemNode>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
