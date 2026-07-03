export interface ResumeMetadata {
  version: string
  updated: string
  atsFriendly: boolean
  pdfPath: string
  downloadLabel: string
  openLabel: string
}

export const resumeMetadata: ResumeMetadata = {
  version: "2.4.0",
  updated: "July 2026",
  atsFriendly: true,
  pdfPath: "/resume.pdf",
  downloadLabel: "Download PDF",
  openLabel: "Open PDF",
}
