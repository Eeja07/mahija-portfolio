"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigationLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Infrastructure", href: "#infrastructure" },
  { name: "Skills", href: "#skills" },
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
      targetElement.scrollIntoView({ behavior: "smooth" })
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

            <Button
              variant="default"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-transform duration-150 shadow-none border-none"
              render={<a href="#resume">Resume</a>}
            />
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

              <div className="flex flex-col gap-4 mt-auto">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-none border-none"
                  render={
                    <a href="#resume" onClick={() => setIsOpen(false)}>
                      Resume
                    </a>
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
