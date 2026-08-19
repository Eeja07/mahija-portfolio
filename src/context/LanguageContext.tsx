"use client"

import React, { createContext, useContext, useSyncExternalStore } from "react"

type Language = "en" | "id"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
})

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener("local-language-change", callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("local-language-change", callback)
  }
}

function getSnapshot(): Language {
  if (typeof window === "undefined") return "en"
  try {
    const val = localStorage.getItem("preferred-language")
    return val === "id" ? "id" : "en"
  } catch {
    return "en"
  }
}

function getServerSnapshot(): Language {
  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem("preferred-language", lang)
      window.dispatchEvent(new Event("local-language-change"))
    } catch {
      // ignore
    }
  }

  const toggleLanguage = () => {
    const next = language === "en" ? "id" : "en"
    setLanguage(next)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
