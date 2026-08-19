import React from "react"
import { Network } from "lucide-react"

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
      className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 bg-background py-14 md:py-16 relative"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-8 border-b border-zinc-200/70 dark:border-zinc-800/70">
          
          {/* Brand & Specializations */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2">
              <Network className="size-4 text-blue-500 dark:text-cyan-400" />
              <span className="font-mono font-bold text-foreground tracking-tight text-base">
                Mahija Ibad Pradipta
              </span>
            </div>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              Debian 12 &bull; Docker Mesh &bull; IoT Telemetry &bull; Edge AI &bull; Cloudflared
            </span>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer Links" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-sm py-0.5"
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Infrastructure & Hosting Information */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 text-zinc-500 dark:text-zinc-400 select-none">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              <span>SELF-HOSTED DEBIAN 12 LIVE NODE // CLUSTER-01</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              <span>Debian 12 Host</span>
              <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">&bull;</span>
              <span>Docker Swarm/Compose</span>
              <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">&bull;</span>
              <span>Cloudflare Tunnel</span>
              <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">&bull;</span>
              <a 
                href="https://portfolio.eeja.fun" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 dark:text-cyan-400 hover:underline font-bold"
              >
                eeja.fun
              </a>
            </div>
          </div>
          
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Mahija. Telemetry status: 100% Operational.
          </span>
        </div>
      </div>
    </footer>
  )
}
