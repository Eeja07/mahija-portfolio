export interface CertificationItem {
  id: string
  title: string
  titleId: string
  issuer: string
  issuerId: string
  period: string
  category: string
  categoryId: string
  credentialId?: string
  skills: string[]
  summary: string
  summaryId: string
  certificatePlaceholder: {
    title: string
    caption: string
  }
}

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-mtcna",
    title: "MikroTik Certified Network Associate (MTCNA)",
    titleId: "MikroTik Certified Network Associate (MTCNA)",
    issuer: "MikroTik",
    issuerId: "MikroTik",
    period: "Sep 2026",
    category: "Network Engineering",
    categoryId: "Teknik Jaringan",
    credentialId: "MIKROTIK-MTCNA-2026",
    skills: ["MikroTik RouterOS", "Routing & Bridging", "Network Security", "Bandwidth Management", "Wireless & Tunnels"],
    summary: "Official international networking credential validating proficiency in MikroTik RouterOS and RouterBOARD hardware configuration.",
    summaryId: "Sertifikasi internasional resmi yang memvalidasi kompetensi konfigurasi MikroTik RouterOS dan perangkat keras RouterBOARD.",
    certificatePlaceholder: {
      title: "MTCNA Certificate — MikroTik",
      caption: "Official MikroTik Certified Network Associate (MTCNA) credential issued by MikroTik.",
    },
  },
  {
    id: "cert-toefl-prediction",
    title: "TOEFL Prediction Test",
    titleId: "Tes Prediksi TOEFL",
    issuer: "Kampung Inggris Pare (Kediri)",
    issuerId: "Kampung Inggris Pare (Kediri)",
    period: "Agu 2025",
    category: "Language Proficiency",
    categoryId: "Kemampuan Bahasa",
    credentialId: "TOEFL-PRED-KAMPUNG-INGGRIS",
    skills: ["Listening Comprehension", "Structure & Written Expression", "Reading Comprehension", "English Grammar"],
    summary: "Certified TOEFL Prediction assessment measuring academic and professional English communication and grammatical proficiency.",
    summaryId: "Sertifikasi tes prediksi TOEFL resmi untuk mengukur kompetensi bahasa Inggris akademis, tata bahasa, dan profesional.",
    certificatePlaceholder: {
      title: "TOEFL Prediction Certificate — Kampung Inggris",
      caption: "Official TOEFL Prediction certification score report from Kampung Inggris Pare.",
    },
  },
  {
    id: "cert-tefl-its",
    title: "Test of English as a Foreign Language (TEFL) ITS",
    titleId: "Test of English as a Foreign Language (TEFL) ITS",
    issuer: "UPT Bahasa Institut Teknologi Sepuluh Nopember (ITS)",
    issuerId: "UPT Bahasa Institut Teknologi Sepuluh Nopember (ITS)",
    period: "Jul 2025",
    category: "Language Proficiency",
    categoryId: "Kemampuan Bahasa",
    credentialId: "UPT-BAHASA-ITS-TEFL",
    skills: ["English Communication", "Academic Listening", "Technical Reading", "Written Expression"],
    summary: "Institutional standardized English proficiency examination certified by the Language Center of Institut Teknologi Sepuluh Nopember.",
    summaryId: "Ujian standarisasi kemampuan bahasa Inggris resmi yang diterbitkan oleh UPT Bahasa Institut Teknologi Sepuluh Nopember.",
    certificatePlaceholder: {
      title: "TEFL ITS Certificate",
      caption: "Official TEFL Certificate score report from UPT Bahasa ITS Surabaya.",
    },
  },
]

export function getCertifications(lang: "en" | "id" = "en") {
  return certificationsData.map((item) => ({
    ...item,
    title: lang === "id" ? item.titleId : item.title,
    issuer: lang === "id" ? item.issuerId : item.issuer,
    category: lang === "id" ? item.categoryId : item.category,
    summary: lang === "id" ? item.summaryId : item.summary,
  }))
}
