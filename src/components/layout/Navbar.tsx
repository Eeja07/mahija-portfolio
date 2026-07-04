"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, Download } from "lucide-react"
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

const navigationLinks = [
  { name: "Projects", href: "/#featured-engineering" },
  { name: "Experience", href: "/#experience" },
  { name: "Organizations", href: "/#organizations" },
  { name: "Training", href: "/#training" },
  { name: "Awards", href: "/#awards" },
  { name: "Repositories", href: "/#repositories" },
  { name: "Resume", href: "/#resume" },
  { name: "Contact", href: "/#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch for theme toggle
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    // Ensure page-wide anchor offsets respect the sticky navbar header
    document.documentElement.style.scrollPaddingTop = "80px"
    document.documentElement.style.scrollBehavior = "smooth"

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.substring(1) // e.g. "#featured-engineering"
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
        "fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center transition-all duration-150 ease-in-out",
        scrolled
          ? "border-b border-zinc-800 bg-background/80 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans font-semibold tracking-tight text-lg text-zinc-50 hover:text-zinc-300 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-700"
        >
          Mahija
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-700 rounded-sm px-1 py-0.5"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-zinc-800" aria-hidden="true" />

          {/* Theme Toggle & Primary Resume Button */}
          <div className="flex items-center gap-3">
            {mounted && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="text-zinc-400 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "bg-zinc-200 text-zinc-800 hover:bg-zinc-50 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700 transition-transform duration-150 shadow-none border-none cursor-pointer flex items-center gap-1.5"
                )}
              >
                <span>Resume</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3 transition-transform duration-150">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border border-zinc-800 bg-zinc-950 shadow-md">
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
                    className="flex items-center gap-2 cursor-pointer hover:bg-zinc-800 text-sm font-sans text-zinc-200"
                  >
                    <Download className="size-3.5 text-zinc-400" />
                    <span>{variant.label}</span>
                    <Badge variant="outline" className="ml-auto font-mono text-[9px] px-1.5 py-0 select-none border-zinc-800 text-zinc-400 bg-zinc-950/40">
                      {variant.language}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Nav Controls */}
        <div className="flex md:hidden items-center gap-3">
          {mounted && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="text-zinc-400 hover:text-zinc-200"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Open Navigation Menu"
                  className="text-zinc-200 border-zinc-800 bg-zinc-950/40 hover:bg-zinc-800"
                >
                  <Menu className="size-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[280px] p-6 border-l border-zinc-800 bg-zinc-950 flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <SheetHeader className="text-left p-0">
                  <SheetTitle className="font-sans font-semibold tracking-tight text-lg text-zinc-50">
                    Mahija
                  </SheetTitle>
                </SheetHeader>

                <nav aria-label="Mobile Navigation Menu" className="flex flex-col gap-4">
                  {navigationLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-base font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-150 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-700"
                    >
                      {link.name}
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
                    "w-full bg-zinc-200 text-zinc-800 hover:bg-zinc-50 font-medium justify-center text-center flex items-center gap-2 border-none"
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
                    "w-full border border-zinc-800 text-zinc-200 bg-zinc-950/40 hover:bg-zinc-800 font-medium justify-center text-center flex items-center gap-2"
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
