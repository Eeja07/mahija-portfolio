export interface CredentialDocument {
  id: string
  title: string
  titleId: string
  category: string
  categoryId: string
  issuer: string
  date: string
  description: string
  descriptionId: string
}

export const academicCredentials: CredentialDocument[] = [
  {
    id: "surat-keterangan-lulus",
    title: "Bachelor of Computer Engineering (S.T.) Statement",
    titleId: "Surat Keterangan Kelulusan Sarjana Teknik Komputer (S.T.)",
    category: "Graduation Statement",
    categoryId: "Keterangan Kelulusan",
    issuer: "Institut Teknologi Sepuluh Nopember (ITS)",
    date: "July 2026",
    description: "Official statement letter verifying undergraduate completion (S1) in Computer Engineering, FTEIC ITS Surabaya.",
    descriptionId: "Surat keterangan resmi verifikasi kelulusan Sarjana (S1) Program Studi Teknik Komputer, FTEIC ITS Surabaya.",
  },
]

export function getAcademicCredentials(lang: "en" | "id" = "en") {
  return academicCredentials.map((c) => ({
    ...c,
    title: lang === "id" ? c.titleId : c.title,
    category: lang === "id" ? c.categoryId : c.category,
    description: lang === "id" ? c.descriptionId : c.description,
  }))
}
