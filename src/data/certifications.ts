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
    id: "cert-graduation-statement",
    title: "Bachelor of Computer Engineering (S.T.) Official Degree Statement",
    titleId: "Surat Keterangan Kelulusan Sarjana Teknik Komputer (S.T.)",
    issuer: "Institut Teknologi Sepuluh Nopember (ITS)",
    issuerId: "Institut Teknologi Sepuluh Nopember (ITS)",
    period: "Jul 2026",
    category: "Academic Degree",
    categoryId: "Gelar Akademik",
    credentialId: "ITS-FTEIC-2026-ST",
    skills: ["Computer Engineering", "Embedded Systems", "Network Architecture", "IoT & Edge AI"],
    summary: "Official verified statement letter confirming undergraduate completion in Computer Engineering (S1) from FTEIC ITS Surabaya.",
    summaryId: "Surat keterangan resmi verifikasi kelulusan Sarjana (S1) Program Studi Teknik Komputer, FTEIC ITS Surabaya.",
    certificatePlaceholder: {
      title: "Bachelor of Computer Engineering Degree Statement",
      caption: "Official undergraduate completion verification from FTEIC ITS Surabaya.",
    },
  },
  {
    id: "cert-lkmm-tm",
    title: "Middle-Level Leadership & Management Certification (LKMM-TM)",
    titleId: "Sertifikasi Keterampilan Manajemen Mahasiswa Tingkat Menengah (LKMM-TM)",
    issuer: "Directorate of Student Affairs ITS (Ditmawa)",
    issuerId: "Direktorat Kemahasiswaan ITS (Ditmawa)",
    period: "Mei 2024",
    category: "Management & Leadership",
    categoryId: "Manajemen & Kepemimpinan",
    credentialId: "DITMAWA-ITS-LKMM-TM-2024",
    skills: ["Organizational Policy", "Strategic Planning", "Crisis Management", "Risk Assessment"],
    summary: "Advanced leadership credential covering institutional policy formulation, conflict resolution, and strategic risk management.",
    summaryId: "Sertifikasi kepemimpinan tingkat lanjut mengenai perumusan kebijakan organisasi, resolusi konflik, dan manajemen risiko.",
    certificatePlaceholder: {
      title: "LKMM-TM Leadership Certification",
      caption: "Official Middle-Level Student Management Skills Certificate from Directorate of Student Affairs ITS.",
    },
  },
  {
    id: "cert-pkti-td",
    title: "Scientific Research & Technical Writing Certification (PKTI-TD)",
    titleId: "Sertifikasi Karya Tulis Ilmiah Tingkat Dasar (PKTI-TD)",
    issuer: "Directorate of Student Affairs ITS (Ditmawa)",
    issuerId: "Direktorat Kemahasiswaan ITS (Ditmawa)",
    period: "Okt 2023",
    category: "Technical & Scientific",
    categoryId: "Teknis & Ilmiah",
    credentialId: "DITMAWA-ITS-PKTI-TD-2023",
    skills: ["Scientific Methodology", "Hypothesis Formulation", "Bibliographic Review", "Technical Defense"],
    summary: "Academic research qualification focusing on scientific methodology, paper structure, and systematic literature review.",
    summaryId: "Kualifikasi penelitian akademik berfokus pada metodologi ilmiah, struktur makalah, dan tinjauan pustaka sistematis.",
    certificatePlaceholder: {
      title: "PKTI-TD Scientific Writing Certificate",
      caption: "Official scientific writing certification from Directorate of Student Affairs ITS.",
    },
  },
  {
    id: "cert-lkmm-td",
    title: "Basic Student Management Skills Certification (LKMM-TD)",
    titleId: "Sertifikasi Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD)",
    issuer: "Directorate of Student Affairs ITS (Ditmawa)",
    issuerId: "Direktorat Kemahasiswaan ITS (Ditmawa)",
    period: "Nov 2023",
    category: "Operations & Workplans",
    categoryId: "Operasional & Rencana Kerja",
    credentialId: "DITMAWA-ITS-LKMM-TD-2023",
    skills: ["Structured Decision-Making", "Gantt-Based Planning", "Task Delegation", "Team Dynamics"],
    summary: "Core operational management qualification covering decision-making frameworks, team delegation, and Gantt-based execution.",
    summaryId: "Kualifikasi manajemen operasional meliputi kerangka pengambilan keputusan, pendelegasian tugas, dan eksekusi berbasis Gantt.",
    certificatePlaceholder: {
      title: "LKMM-TD Management Certificate",
      caption: "Official Basic Student Management Skills Certificate from Directorate of Student Affairs ITS.",
    },
  },
  {
    id: "cert-mage-workshop",
    title: "Full-Stack API & Database Integration Certification (MAGE 9)",
    titleId: "Sertifikasi Integrasi API & Basis Data (MAGE 9)",
    issuer: "Department of Computer Engineering ITS",
    issuerId: "Departemen Teknik Komputer ITS",
    period: "Agu 2023",
    category: "Software Engineering",
    categoryId: "Rekayasa Perangkat Lunak",
    credentialId: "DTK-ITS-MAGE9-2023",
    skills: ["RESTful APIs", "Validation Middleware", "Persistent Schemas", "Auth Tokens"],
    summary: "Technical software credential on RESTful architecture, database synchronization, and secure tokenized authentication.",
    summaryId: "Sertifikasi perangkat lunak teknis mengenai arsitektur RESTful, sinkronisasi basis data, dan autentikasi token aman.",
    certificatePlaceholder: {
      title: "MAGE 9 Technical Workshop Certificate",
      caption: "Official technical certificate from Department of Computer Engineering ITS.",
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
