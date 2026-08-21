export interface CredentialDocument {
  id: string
  title: string
  titleId: string
  category: string
  categoryId: string
  issuer: string
  date: string
  file: string
  description: string
  descriptionId: string
  primary?: boolean
}

export const academicCredentials: CredentialDocument[] = [
  {
    id: "surat-keterangan-lulus",
    title: "Bachelor of Computer Engineering (S.T.) Verification",
    titleId: "Verifikasi Kelulusan Sarjana Teknik Komputer (S.T.)",
    category: "Degree Verification",
    categoryId: "Verifikasi Kelulusan",
    issuer: "Institut Teknologi Sepuluh Nopember (ITS)",
    date: "July 2026",
    file: "/images/docs/lkmm-tm-doc.svg",
    description: "Official statement of undergraduate completion (S1) in Computer Engineering, Faculty of Intelligent Electrical and Informatics Technology, ITS Surabaya.",
    descriptionId: "Pernyataan resmi kelulusan Sarjana (S1) Program Studi Teknik Komputer, Fakultas Teknologi Elektro dan Informatika Cerdas, Institut Teknologi Sepuluh Nopember Surabaya.",
    primary: true,
  },
  {
    id: "transkrip-akademik",
    title: "Cumulative Academic Record Summary",
    titleId: "Ringkasan Rekam Jejak Akademik Kumulatif",
    category: "Academic Records",
    categoryId: "Rekam Akademik",
    issuer: "Institut Teknologi Sepuluh Nopember (ITS)",
    date: "July 2026",
    file: "/images/docs/daspro-ta-doc.svg",
    description: "Cumulative academic coursework record for 150 completed credits across all undergraduate semesters.",
    descriptionId: "Rekam jejak akademik kumulatif mata kuliah untuk 150 SKS tempuh / 141 SKS lulus di seluruh semester sarjana.",
    primary: true,
  },
  {
    id: "skem-its",
    title: "SKEM Extracurricular Verification Record",
    titleId: "SKEM (Sertifikat Kegiatan Ekstrakurikuler Mahasiswa)",
    category: "Activity Verification",
    categoryId: "Sertifikasi Kegiatan",
    issuer: "Direktorat Kemahasiswaan ITS",
    date: "July 2026",
    file: "/images/docs/lkmm-td-doc.svg",
    description: "Official digital verification for student management training (LKMM), organizational leadership, robotics teams, and academic committees.",
    descriptionId: "Verifikasi digital resmi untuk pelatihan manajemen mahasiswa (LKMM), kepemimpinan organisasi, tim robotika, dan kepanitiaan akademik.",
    primary: false,
  },
  {
    id: "skpi-its",
    title: "Diploma Supplement Portfolio (SKPI)",
    titleId: "Surat Keterangan Pendamping Ijazah (SKPI)",
    category: "Diploma Supplement",
    categoryId: "Pendamping Ijazah",
    issuer: "myITS Student Connect",
    date: "July 2026",
    file: "/images/docs/pkti-td-doc.svg",
    description: "Comprehensive portfolio record of competencies, student competitions, industrial internships, and leadership roles.",
    descriptionId: "Portofolio komprehensif capaian kompetensi, kompetisi mahasiswa, magang industri, dan peran kepemimpinan.",
    primary: false,
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
