import React from "react"

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
      className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-background py-12 md:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          
          {/* Brand & Specializations */}
          <div className="flex flex-col gap-2">
            <span className="font-sans font-semibold text-foreground tracking-tight text-sm">
              Mahija Ibad Pradipta
            </span>
            <span className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
              Infrastructure &bull; IoT &bull; Fullstack &bull; Edge AI
            </span>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer Links" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-sm py-0.5"
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Infrastructure & Hosting Information */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 text-zinc-500 dark:text-zinc-400 select-none">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-sans">
              Hosted on self-managed infrastructure.
            </span>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span>Debian 12</span>
              <span className="text-zinc-200 dark:text-zinc-800" aria-hidden="true">|</span>
              <span>Docker</span>
              <span className="text-zinc-200 dark:text-zinc-800" aria-hidden="true">|</span>
              <span>Cloudflared</span>
              <span className="text-zinc-200 dark:text-zinc-800" aria-hidden="true">|</span>
              <a 
                href="https://portfolio.eeja.fun" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-foreground transition-colors duration-150"
              >
                eeja.fun
              </a>
            </div>
          </div>
          
          <span className="text-[11px] font-sans text-zinc-500/60 dark:text-zinc-400/60">
            &copy; {new Date().getFullYear()} Mahija. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
