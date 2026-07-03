"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Sun, Moon, Download } from "lucide-react"
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
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Infrastructure", href: "#infrastructure" },
  { name: "Skills", href: "#skills" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch for theme toggle
  useEffect(() => {
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
    // Run once on mount in case page is already scrolled
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    
    const targetElement = document.querySelector(href)
    if (targetElement) {
      const headerOffset = 80 // 80px (5rem) offset to prevent header overlap
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <nav
      aria-label="Global Navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full h-16 flex items-center transition-all duration-150 ease-in-out",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans font-semibold tracking-tight text-lg text-foreground hover:text-primary transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm px-1 py-0.5"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Theme Toggle & Primary Resume Button */}
          <div className="flex items-center gap-3">
            {mounted && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                  "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform duration-150 shadow-none border-none cursor-pointer flex items-center gap-1.5"
                )}
              >
                <span>Resume</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3 transition-transform duration-150 group-data-[state=open]/dropdown-menu-trigger:rotate-180">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
                  >
                    <Download className="size-3.5 text-muted-foreground" />
                    <span>{variant.label}</span>
                    <Badge variant="outline" className="ml-auto font-mono text-[9px] px-1.5 py-0 select-none border-border/60">
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
              className="text-muted-foreground hover:text-foreground"
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
                  className="text-foreground border-border hover:bg-muted"
                >
                  <Menu className="size-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[280px] p-6 border-l border-border bg-background flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <SheetHeader className="text-left p-0">
                  <SheetTitle className="font-sans font-semibold tracking-tight text-lg text-foreground">
                    Mahija
                  </SheetTitle>
                </SheetHeader>

                <nav aria-label="Mobile Navigation Menu" className="flex flex-col gap-4">
                  {navigationLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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
                    "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-none border-none justify-center text-center flex items-center gap-2"
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
                    "w-full border border-border text-foreground hover:bg-muted font-semibold justify-center text-center flex items-center gap-2"
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
