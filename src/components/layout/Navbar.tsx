"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { Sun, Moon, Menu, Download, Network, Languages } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { resumeVariants, resumeMetadata } from "@/data/resume"
import { cn } from "@/lib/utils"

interface NavbarProps {
  onLogoClick?: () => void
}

export default function Navbar({ onLogoClick }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  const t = translations[language].nav

  const navItems = [
    { name: t.projects, href: "/#featured-engineering" },
    { name: t.experience, href: "/#experience" },
    { name: t.skills, href: "/#skills" },
    { name: t.organizations, href: "/#organizations" },
    { name: t.training, href: "/#training" },
    { name: t.awards, href: "/#awards" },
    { name: t.repositories, href: "/#repositories" },
    { name: t.resume, href: "/#resume" },
    { name: t.contact, href: "/#contact" },
  ]

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    document.documentElement.style.scrollPaddingTop = "80px"
    document.documentElement.style.scrollBehavior = "smooth"

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.substring(1)
      const targetElement = document.querySelector(targetId)
      
      if (targetElement && window.location.pathname === "/") {
        e.preventDefault()
        setIsOpen(false)
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }
  }

  return (
    <nav
      aria-label="Global Navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center transition-all duration-200 ease-in-out",
        scrolled
          ? "border-b border-zinc-200/90 dark:border-zinc-800/90 bg-background/85 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Network Brand Logo (No NODE // 0x01 badge) */}
        <Link
          href="/"
          onClick={(e) => {
            if (onLogoClick && window.location.pathname === "/") {
              e.preventDefault()
              onLogoClick()
            }
          }}
          className="flex items-center gap-2 font-mono font-semibold tracking-tight text-base text-foreground hover:text-blue-500 dark:hover:text-cyan-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring group cursor-pointer"
        >
          <div className="size-7 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-xs group-hover:border-blue-500/50">
            <Network className="size-4" />
          </div>
          <span className="font-sans font-bold text-lg">Mahija</span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {navItems.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs font-medium font-mono text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-sm px-1 py-0.5"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />

          {/* Theme Toggle, Language Toggle & Primary Resume Button */}
          <div className="flex items-center gap-2.5">
            {mounted && (
              <>
                {/* Language Mode Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 text-xs font-mono font-semibold text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150 cursor-pointer shadow-xs"
                  title="Switch Language (EN / ID)"
                  aria-label="Switch Language"
                >
                  <Languages className="size-3.5 text-blue-500 dark:text-cyan-400" />
                  <span>{language.toUpperCase()}</span>
                </button>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                  className="text-zinc-500 dark:text-zinc-400 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 cursor-pointer"
                >
                  {theme === "dark" ? (
                    <Sun className="size-4 text-amber-400" />
                  ) : (
                    <Moon className="size-4 text-blue-600" />
                  )}
                </Button>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "bg-foreground text-background hover:opacity-90 font-mono text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-transform duration-150 shadow-none border-none cursor-pointer flex items-center gap-1.5 rounded-lg"
                )}
              >
                <Download className="size-3.5" />
                <span>{t.downloadCv}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border border-zinc-200 dark:border-zinc-800 bg-background shadow-lg p-1.5 rounded-xl font-sans">
                {resumeVariants.map((variant) => (
                  <DropdownMenuItem
                    key={variant.id}
                    nativeButton={false}
                    render={
                      <a
                        href={variant.href}
                        download={`Mahija_Resume_${variant.language}.pdf`}
                      />
                    }
                    className="flex items-center gap-2.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-sm text-foreground rounded-lg px-2.5 py-2"
                  >
                    <Download className="size-3.5 text-zinc-500 dark:text-zinc-400" />
                    <span>{variant.label}</span>
                    <Badge variant="outline" className="ml-auto font-mono text-[9px] px-1.5 py-0 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900">
                      {variant.language}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Nav Trigger & Theme Controls */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-xs font-mono font-semibold text-foreground"
                aria-label="Switch Language"
              >
                <Languages className="size-3 text-blue-500 dark:text-cyan-400" />
                <span>{language.toUpperCase()}</span>
              </button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="text-foreground border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
              >
                {theme === "dark" ? (
                  <Sun className="size-4 text-amber-400" />
                ) : (
                  <Moon className="size-4 text-blue-600" />
                )}
              </Button>
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Open Navigation Menu"
                  className="text-foreground border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  <Menu className="size-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[280px] p-6 border-l border-zinc-200 dark:border-zinc-800 bg-background flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <SheetHeader className="text-left p-0">
                  <SheetTitle className="font-mono font-semibold tracking-tight text-base text-foreground flex items-center gap-2">
                    <Network className="size-4 text-blue-500 dark:text-cyan-400" />
                    <span>Mahija</span>
                  </SheetTitle>
                </SheetHeader>

                <nav aria-label="Mobile Navigation Menu" className="flex flex-col gap-3 font-mono">
                  {navItems.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors duration-150 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      &gt; {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href={resumeMetadata.english.file}
                  download={`Mahija_Resume_${resumeMetadata.english.language}.pdf`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "w-full bg-foreground text-background hover:opacity-90 font-mono text-xs font-medium justify-center text-center flex items-center gap-2 border-none rounded-xl"
                  )}
                >
                  <Download className="size-4" />
                  {resumeMetadata.english.label}
                </a>
                <a
                  href={resumeMetadata.indonesian.file}
                  download={`Mahija_Resume_${resumeMetadata.indonesian.language}.pdf`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full border border-zinc-200 dark:border-zinc-800 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 font-mono text-xs font-medium justify-center text-center flex items-center gap-2 rounded-xl"
                  )}
                >
                  <Download className="size-4" />
                  {resumeMetadata.indonesian.label}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
