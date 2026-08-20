import React from "react"
import { NetworkMonogramM } from "@/components/network/NetworkMonogramM"

const footerLinks = [
  { name: "GitHub", href: "https://github.com/Eeja07" },
  { name: "LinkedIn", href: "https://linkedin.com/in/mahijaibad" },
  { name: "Resume", href: "#resume" },
  { name: "Email", href: "mailto:mahijapradipta86@gmail.com" },
]

export default function Footer() {
  return (
    <footer 
      aria-label="Site Footer"
      className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 bg-transparent py-12 md:py-14 relative"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-zinc-200/70 dark:border-zinc-800/70">
          
          {/* Brand & Specializations */}
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex items-center gap-2.5">
              <div className="size-6 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-0.5 text-blue-500 dark:text-cyan-400">
                <NetworkMonogramM className="size-3.5" />
              </div>
              <span className="font-sans font-bold text-foreground tracking-tight text-base">
                Mahija Ibad Pradipta
              </span>
            </div>
            <span className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
              Computer Engineering Student &bull; Embedded Systems &bull; Autonomous Robotics &bull; Full-Stack
            </span>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer Links" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs sm:text-sm font-sans font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-sm py-0.5"
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Clean Minimalist Bottom Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 text-xs text-zinc-500 dark:text-zinc-400 select-none">
          <div className="flex items-center gap-2">
            <span>Hosted on</span>
            <a 
              href="https://eeja.fun" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-cyan-400 hover:underline font-mono font-bold"
            >
              eeja.fun
            </a>
            <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">&bull;</span>
            <span>Debian 12 &bull; Docker</span>
          </div>
          
          <span className="font-sans text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Mahija Ibad Pradipta. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
