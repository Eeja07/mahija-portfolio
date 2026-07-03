export interface ResumeVariant {
  id: string
  label: string
  language: string
  href: string
  primary: boolean
  // Backward compatibility field for older component usages
  file?: string
}

export interface ResumeMetadata {
  version: string
  updated: string
  atsFriendly: boolean
  // Backward compatibility fields for older component references
  english: ResumeVariant
  indonesian: ResumeVariant
}

export const resumeVariants: ResumeVariant[] = [
  {
    id: "en",
    label: "English Resume",
    language: "EN",
    href: "/resume/Mahija_Resume_EN.pdf",
    file: "/resume/Mahija_Resume_EN.pdf",
    primary: true,
  },
  {
    id: "id",
    label: "Resume Indonesia",
    language: "ID",
    href: "/resume/Mahija_Resume_ID.pdf",
    file: "/resume/Mahija_Resume_ID.pdf",
    primary: false,
  },
]

export const resumeMetadata: ResumeMetadata = {
  version: "v2.4.0",
  updated: "July 2026",
  atsFriendly: true,
  english: resumeVariants[0],
  indonesian: resumeVariants[1],
}
