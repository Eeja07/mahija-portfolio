export interface CertificationItem {
  id: string
  title: string
  issuer: string
  period: string
  category: string
  credentialId?: string
  skills?: string[]
  documentUrl?: string
  certificatePlaceholder?: {
    title: string
    caption: string
  }
}

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-mtcna",
    title: "MikroTik Certified Network Associate (MTCNA)",
    issuer: "MikroTik",
    period: "September 2026",
    category: "Network Associate",
    credentialId: "MTCNA-MIKROTIK",
    documentUrl: "/certifications/Mahija Ibad Pradipta_MTCNA_MikroTik.pdf",
    certificatePlaceholder: {
      title: "MTCNA Certificate — MikroTik",
      caption: "Official MikroTik Certified Network Associate (MTCNA) credential issued by MikroTik.",
    },
  },
]

export function getCertifications(_lang: "en" | "id" = "en"): CertificationItem[] {
  return certificationsData
}
