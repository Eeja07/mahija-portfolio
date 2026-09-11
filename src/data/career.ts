export interface PlaceholderSlot {
  title: string
  caption: string
}

export interface CareerMediaFile {
  url: string
  title: string
  caption?: string
}

export interface CareerItem {
  id: string
  title: string
  role: string
  period: string
  location?: string
  summary?: string
  bullets: string[]
  featured: boolean
  photos?: CareerMediaFile[]
  documents?: CareerMediaFile[]
  photoPlaceholder?: PlaceholderSlot
  certificatePlaceholder?: PlaceholderSlot
}

export interface AwardItem {
  title: string
  competition: string
  period: string
  summary?: string
  bullets?: string[]
  certificateUrl?: string
  documents?: CareerMediaFile[]
  photos?: CareerMediaFile[]
  photoPlaceholder?: PlaceholderSlot
  certificatePlaceholder?: PlaceholderSlot
  instagramUrl?: string
}

export const organizations: CareerItem[] = [
  {
    id: "m-iot-coordinator",
    title: "M-IOT Laboratory — Computer Engineering ITS — Surabaya",
    role: "Coordinator - Board of Directors",
    period: "June 2025 – May 2026",
    location: "On-site",
    bullets: [
      "Improved laboratory quality in both project development and human resource development aspects",
      "Supervised overall timelines and task execution across all divisions and subdivisions",
      "Coordinated laboratory management activities with external stakeholders and university administration",
    ],
    featured: true,
  },
  {
    id: "himatekkom-cadre-head",
    title: "HIMATEKKOM ITS — Surabaya",
    role: "Head of Cadre Development Department - Board of Directors",
    period: "March 2025 – February 2026",
    location: "On-site",
    bullets: [
      "Guided IC and OC teams in executing all cadre development activities",
      "Mentored SC members in designing assessment systems and activity timelines",
      "Coordinated with students and the Computer Engineering Department regarding cadre development activities",
    ],
    featured: true,
  },
  {
    id: "m-iot-archive-staff",
    title: "M-IOT Laboratory — Computer Engineering ITS — Surabaya",
    role: "Archive Staff - Internal Division",
    period: "August 2024 – June 2025",
    location: "On-site",
    bullets: [
      "Managed archives of thesis topics and telematics projects conducted by M-IOT Laboratory assistants",
      "Maintained archives of midterm and final examination materials for M-IOT specialization courses",
      "Compiled learning materials for M-IOT specialization courses",
    ],
    featured: true,
  },
  {
    id: "banyubramanta-official-head",
    title: "Banyubramanta Robotics Team ITS — Surabaya",
    role: "Head of Official Division - Board of Directors",
    period: "July 2024 – May 2025",
    location: "On-site",
    bullets: [
      "Led the Administration & Finance, Public Relations & Sponsorship, and Creative & Branding subdivisions",
      "Planned and supervised overall timelines and task execution across all subdivisions",
      "Ensured smooth execution of the team’s administrative and non-technical operations",
    ],
    featured: true,
    photos: [
      {
        url: "/organizations/head_banyubramanta/Head_Banyubramanta ITS.jpg",
        title: "Head of Official Division — Banyubramanta Robotics Team ITS",
        caption: "Documentation photo for Head of Official Division at Banyubramanta Robotics Team ITS.",
      },
    ],
    documents: [
      {
        url: "/organizations/head_banyubramanta/Head_Banyubramanta ITS.pdf",
        title: "SK Kepengurusan Head of Official Division — Banyubramanta ITS",
        caption: "Decree / appointment certificate of Head of Official Division, Banyubramanta Robotics Team ITS.",
      },
    ],
  },
  {
    id: "himatekkom-sec-treasurer",
    title: "HIMATEKKOM ITS — Surabaya",
    role: "Secretary and Treasurer Staff - Board of Directors",
    period: "March 2024 – March 2025",
    location: "On-site",
    bullets: [
      "Coordinated with the Computer Engineering Department regarding organizational administration",
      "Prepared outgoing letters, meeting minutes, and certificate submissions for organizational activities",
      "Maintained archives of important documents in both digital and physical formats",
    ],
    featured: true,
  },
  {
    id: "himatekkom-cadre-sc",
    title: "HIMATEKKOM ITS — Surabaya",
    role: "Steering Committee Staff - Cadre Development Department",
    period: "April 2024 – December 2024",
    location: "On-site",
    bullets: [
      "Coordinated with IC (Instructor Committee) and OC (Organizing Committee) regarding cadre development activities",
      "Designed student assessment systems and overall cadre development timelines",
      "Coordinated with students and the Computer Engineering Department regarding cadre development activities",
    ],
    featured: false,
  },
  {
    id: "banyubramanta-senior-finance",
    title: "Banyubramanta Robotics Team ITS — Surabaya",
    role: "Senior Finance Staff - Official Division",
    period: "February 2023 – July 2024",
    location: "On-site",
    bullets: [
      "Recorded team income and expenditures",
      "Managed team budget allocation",
      "Prepared accountability reports, financial reports, and budget plans",
    ],
    featured: false,
    documents: [
      {
        url: "/organizations/senior_banyubramanta/Senior_Banyubramanta ITS.pdf",
        title: "SK Kepengurusan Senior Finance Staff — Banyubramanta ITS",
        caption: "Decree / appointment certificate of Senior Finance Staff, Banyubramanta Robotics Team ITS.",
      },
    ],
  },
  {
    id: "banyubramanta-finance-intern",
    title: "Banyubramanta Robotics Team ITS — Surabaya",
    role: "Finance and Administration Intern - Official Division",
    period: "November 2022 – January 2023",
    location: "On-site",
    bullets: [
      "Prepared sponsorship and administrative proposals",
      "Prepared contracts, accountability reports, and budget plans",
      "Created content for the team’s social media platforms",
    ],
    featured: false,
    photos: [
      {
        url: "/organizations/senior_banyubramanta/Intern_Banyubramanta ITS.jpg",
        title: "Finance & Administration Intern — Banyubramanta Robotics Team ITS",
        caption: "Documentation photo during internship at Banyubramanta Robotics Team ITS.",
      },
    ],
    documents: [
      {
        url: "/organizations/senior_banyubramanta/Intern_Banyubramanta ITS.pdf",
        title: "Sertifikat Intern Finance & Administration — Banyubramanta ITS",
        caption: "Official internship certificate for Finance & Administration subdivision, Banyubramanta Robotics Team ITS.",
      },
    ],
  },
  {
    id: "its-robotics-club",
    title: "ITS Robotics Club — Surabaya",
    role: "Member",
    period: "September 2022 – February 2023",
    location: "On-site",
    bullets: [
      "Actively participated in organizational programs and activities",
    ],
    featured: false,
  },
  {
    id: "its-ibc-club",
    title: "ITS IBC Club — Surabaya",
    role: "Member",
    period: "September 2022 – September 2023",
    location: "On-site",
    bullets: [
      "Actively participated in organizational programs and activities",
    ],
    featured: false,
    photos: [
      {
        url: "/organizations/ibc/Mahija Ibad Pradipta_Sertif_IBC Anggota 2022.png",
        title: "Sertifikat Anggota Aktif UKM IBC ITS 2022",
        caption: "Sertifikat keanggotaan aktif UKM Badminton (IBC) ITS Kabinet Metamorfosa 2022.",
      },
    ],
    documents: [
      {
        url: "/organizations/ibc/Mahija Ibad Pradipta_Sertif_IBC Anggota 2022.png",
        title: "Sertifikat Anggota Aktif UKM IBC ITS 2022",
        caption: "Sertifikat keanggotaan aktif UKM Badminton (IBC) ITS Kabinet Metamorfosa 2022.",
      },
    ],
  },
]

export const committees: CareerItem[] = [
  {
    id: "mage-10",
    title: "Multimedia And Game Event 10 — Computer Engineering ITS",
    role: "Head of Event Division - Board of Directors",
    period: "February 2024 – February 2025",
    location: "On-site",
    bullets: [
      "Guided staff in designing and executing IoT, Multimedia, and Robotics workshops",
      "Guided staff in planning and executing opening ceremonies, talk shows, exhibitions, and closing events",
      "Supervised and evaluated the implementation of workshops, talk shows, exhibitions, opening ceremonies, and closing events",
    ],
    featured: true,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Foto Kegiatan_Kadiv Mage X.jpg",
        title: "Kadiv MAGE X — Foto Kegiatan MAGE 10",
        caption: "Dokumentasi kegiatan Kepala Divisi Acara MAGE X, Teknik Komputer ITS.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad_Sertif_Kadiv Mage X.pdf",
        title: "Sertifikat Kadiv MAGE X — HIMATEKKOM ITS",
        caption: "Sertifikat penghargaan Kepala Divisi Acara Multimedia and Game Event (MAGE) X.",
      },
    ],
  },
  {
    id: "mage-9",
    title: "Multimedia And Game Event 9 — Computer Engineering ITS",
    role: "Staff - Secretariat Division",
    period: "February 2023 – March 2024",
    location: "On-site",
    bullets: [
      "Managed activity data collection and documentation",
      "Prepared communication materials, attendance records, feedback forms, and meeting minutes",
      "Served as the person in charge of one workshop",
    ],
    featured: true,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Foto Kegiatan_Panitia MAGE 9 2023.jpg",
        title: "Panitia MAGE 9 2023 — Foto Kegiatan",
        caption: "Dokumentasi kegiatan Panitia Divisi Kesekretariatan MAGE 9.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_Panitia MAGE 9 2023.pdf",
        title: "Sertifikat Panitia MAGE 9 2023 — HIMATEKKOM ITS",
        caption: "Sertifikat kepanitiaan Divisi Kesekretariatan MAGE 9, Teknik Komputer ITS.",
      },
    ],
  },
  {
    id: "hgts-se-8",
    title: "HGTS X SE 8.0 — HIMATEKKOM ITS",
    role: "Staff - Teaching Division",
    period: "October 2023",
    location: "On-site",
    bullets: [
      "Designed learning concepts for students of MTs 19 Surabaya",
      "Prepared presentation materials for teaching activities",
      "Taught image detection and pose detection topics to students of MTs 19 Surabaya",
    ],
    featured: true,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Foto Kegiatan_Panitia HGTSxSE8.0 2023.jpg",
        title: "Panitia HGTS x SE 8.0 2023 — Foto Kegiatan",
        caption: "Dokumentasi kegiatan pengajaran image detection dan pose detection pada HGTS x SE 8.0.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_Panitia HGTSxSE8.0 2023.pdf",
        title: "Sertifikat Panitia HGTS x SE 8.0 2023 — HIMATEKKOM ITS",
        caption: "Sertifikat kepanitiaan Divisi Pengajar HGTS x SE 8.0 HIMATEKKOM ITS.",
      },
    ],
  },
  {
    id: "isc-63rd",
    title: "ISC - 63rd ITS Anniversary — ITS",
    role: "Badminton Staff - Event Division",
    period: "September 2023 – November 2023",
    location: "On-site",
    bullets: [
      "Ensured the smooth execution of the inter-faculty badminton tournament",
      "Coordinated match schedules and tournament facilities",
      "Managed documentation and match result records",
    ],
    featured: true,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Foto Kegiatan_Panitia ISC Dies Natalis ITS 63 2023.jpg",
        title: "Panitia ISC Dies Natalis ITS 63 — Foto Kegiatan",
        caption: "Dokumentasi operasional pertandingan bulutangkis antar fakultas pada ISC Dies Natalis ITS ke-63.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_Panitia ISC Dies Natalis ITS 63 2023.pdf",
        title: "Sertifikat Panitia ISC Dies Natalis ITS 63 — ITS",
        caption: "Sertifikat penghargaan panitia pelaksana cabang olahraga bulutangkis ISC Dies Natalis ITS ke-63.",
      },
    ],
  },
  {
    id: "tdc-summit-2023",
    title: "TDC Summit Fest 2023 — TDC ITS",
    role: "TDC For Startup Staff - Event Division",
    period: "August 2023 – November 2023",
    location: "On-site",
    bullets: [
      "Prepared implementation and technical guidelines for startup bootcamp mentoring activities",
      "Prepared implementation and technical guidelines for startup bootcamp coaching activities",
      "Served as Master of Ceremony (MC) during startup bootcamp mentoring sessions",
    ],
    featured: true,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Foto Kegiatan_Panitia TDC Summit Fest 2023.png",
        title: "Panitia TDC Summit Fest 2023 — Foto Kegiatan",
        caption: "Dokumentasi kegiatan dan sesi Master of Ceremony bootcamp mentoring TDC Summit Fest 2023.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_Panitia TDC Summit Fest 2023.pdf",
        title: "Sertifikat Panitia TDC Summit Fest 2023 — TDC ITS",
        caption: "Sertifikat kepanitiaan TDC For Startup Event Division pada TDC Summit Fest 2023.",
      },
    ],
  },
  {
    id: "sps-128",
    title: "SPS 128 — HIMATEKKOM ITS",
    role: "Staff - Event Division",
    period: "June 2023 – September 2023",
    location: "On-site",
    bullets: [
      "Prepared implementation and technical guidelines for the 128th FTE ITS Graduation Appreciation Event",
      "Prepared event rundown for the 128th FTE ITS Graduation Appreciation Event",
      "Served as Liaison Officer for the Head of the Computer Engineering Department",
    ],
    featured: true,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Foto Kegiatan_Panitia SPS 128 2023.jpg",
        title: "Panitia SPS 128 2023 — Foto Kegiatan",
        caption: "Dokumentasi kepanitiaan dan Liaison Officer pada Syukuran Purna Sarjana (SPS) 128 FTE ITS.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_Panitia SPS 128 2023.pdf",
        title: "Sertifikat Panitia SPS 128 2023 — HIMATEKKOM ITS",
        caption: "Sertifikat kepanitiaan Divisi Acara Syukuran Purna Sarjana 128 FTEIC ITS.",
      },
    ],
  },
  {
    id: "inclenation-2023",
    title: "Inclenation 2023 — BEM FTEIC ITS",
    role: "Staff - Mentor Division",
    period: "June 2023 – August 2023",
    location: "On-site",
    bullets: [
      "Mentored 20 freshmen from 6 departments and 10 study programs within FTEIC",
      "Provided guidance and support to freshmen throughout Inclenation 2023",
      "Served as an internalization facilitator during Inclenation 2023",
    ],
    featured: true,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Foto Kegiatan_Panitia Inclenation 2023.jpg",
        title: "Panitia Inclenation 2023 — Foto Kegiatan",
        caption: "Dokumentasi sesi mentoring dan fasilitasi mahasiswa baru pada Inclenation FTEIC ITS 2023.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_Panitia Inclenation 2023.pdf",
        title: "Sertifikat Panitia Inclenation 2023 — BEM FTEIC ITS",
        caption: "Sertifikat kepanitiaan Divisi Mentor Inclenation 2023 BEM FTEIC ITS.",
      },
    ],
  },
  {
    id: "ok2bk-2022",
    title: "OKKBK Teknik Komputer ITS 2022 — HIMATEKKOM ITS",
    role: "Participant",
    period: "August 2022",
    location: "On-site",
    bullets: [
      "Participated in Curriculum-Based Scientific and Professional Orientation (OKKBK) 2022 organized by HIMATEKKOM ITS",
      "Completed introduction to computer engineering discipline, department ethics, and academic community development",
    ],
    featured: false,
    photos: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_OK2BK Teknik Komputer ITS 2022.png",
        title: "Sertifikat OKKBK Teknik Komputer ITS 2022",
        caption: "Sertifikat kepesertaan Orientasi Keilmiahan dan Keprofesian Berbasis Kurikulum (OKKBK) Teknik Komputer ITS 2022.",
      },
    ],
    documents: [
      {
        url: "/committees/Mahija Ibad Pradipta_Sertif_OK2BK Teknik Komputer ITS 2022.png",
        title: "Sertifikat OKKBK Teknik Komputer ITS 2022",
        caption: "Sertifikat kepesertaan Orientasi Keilmiahan dan Keprofesian Berbasis Kurikulum (OKKBK) Teknik Komputer ITS 2022.",
      },
    ],
  },
]

export const awards: AwardItem[] = [
  {
    title: "5th Place - Singapore Autonomous Underwater Vehicle Challenge (SAUVC) 2025",
    competition: "With Banyubramanta ITS",
    period: "March 2025",
    certificateUrl: "/awards/Sertifikat_SAUVC2025.pdf",
    documents: [
      {
        url: "/awards/Sertifikat_SAUVC2025.pdf",
        title: "SAUVC 2025 Certificate — 5th Place",
        caption: "Official finalist and 5th place certificate from the Singapore Autonomous Underwater Vehicle Challenge 2025.",
      },
    ],
    instagramUrl: "https://www.instagram.com/banyubramanta.its/",
  },
  {
    title: "1st Place - Indonesian Underwater Robot Competition National Level 2024",
    competition: "With Banyubramanta ITS",
    period: "July 2024",
    instagramUrl: "https://www.instagram.com/banyubramanta.its/",
  },
  {
    title: "3rd Place - Indonesian Underwater Robot Competition Regional Level II 2024",
    competition: "With Banyubramanta ITS",
    period: "June 2024",
    instagramUrl: "https://www.instagram.com/banyubramanta.its/",
  },
]

export const training: CareerItem[] = [
  {
    id: "mtcna-training",
    title: "MikroTik Certified Network Associate (MTCNA) Training — ID-Networkers",
    role: "Training",
    period: "August 2026",
    bullets: [],
    featured: true,
    documents: [
      {
        url: "/training/mtcna/Mahija Ibad Pradipta_MTCNA_IDN Training.pdf",
        title: "MTCNA Training Certificate — ID-Networkers",
        caption: "Sertifikat pelatihan MikroTik Certified Network Associate dari ID-Networkers.",
      },
    ],
  },
  {
    id: "ccna-training",
    title: "Cisco Certified Network Associate (CCNA) Training — ID-Networkers",
    role: "Training",
    period: "August 2026",
    bullets: [],
    featured: true,
    documents: [
      {
        url: "/training/ccna/Mahija Ibad Pradipta_CCNA_IDN Training.pdf",
        title: "CCNA Training Certificate — ID-Networkers",
        caption: "Sertifikat pelatihan Cisco Certified Network Associate dari ID-Networkers.",
      },
    ],
  },
  {
    id: "lkmm-tm",
    title: "Intermediate Student Management Skills Training (LKMM-TM)",
    role: "Training",
    period: "August 2024",
    bullets: [],
    featured: true,
    documents: [
      {
        url: "/training/lkmm_tm/Mahija Ibad_Student Report - 136_LKMM TM ITS_XI_2024.pdf",
        title: "LKMM-TM Student Report & Verification — ITS",
        caption: "Laporan evaluasi dan lembar kelulusan Pelatihan Keterampilan Manajemen Mahasiswa Tingkat Menengah (LKMM-TM) ITS.",
      },
    ],
  },
  {
    id: "lkmm-td",
    title: "Basic Student Management Skills Training (LKMM-TD)",
    role: "Training",
    period: "November 2023",
    bullets: [],
    featured: true,
    documents: [
      {
        url: "/training/lkmm_td/Mahija Ibad Pradipta_Sertif_Pelatihan LKMM TD.pdf",
        title: "Sertifikat Pelatihan LKMM-TD — ITS",
        caption: "Sertifikat kelulusan Pelatihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD) ITS.",
      },
    ],
  },
  {
    id: "lkmm-pre-basic",
    title: "Pre-Basic Student Management Skills Training",
    role: "Training",
    period: "September 2023",
    bullets: [],
    featured: true,
    documents: [
      {
        url: "/training/lkmm_pratd/Mahija Ibad Pradipta_SK Lulus_Pelatihan LKMM PRA-TD.pdf",
        title: "SK Kelulusan Pelatihan LKMM PRA-TD — ITS",
        caption: "Surat Keputusan dan sertifikat kelulusan Pelatihan LKMM Pra-Dasar ITS.",
      },
    ],
  },
  {
    id: "mage-9-workshop",
    title: "MAGE 9 Multimedia Workshop",
    role: "Workshop",
    period: "August 2023",
    bullets: [],
    featured: true,
    photos: [
      {
        url: "/training/mage_9/Mahija Ibad Pradipta_Foto Kegiatan_Peserta Workshop Multimedia MAGE 9 2023.png",
        title: "Peserta Workshop Multimedia MAGE 9 2023",
        caption: "Dokumentasi keikutsertaan sebagai peserta Workshop Multimedia MAGE 9.",
      },
    ],
    documents: [
      {
        url: "/training/mage_9/Mahija Ibad Pradipta_Sertif_Peserta Workshop Multimedia MAGE 9 2023.pdf",
        title: "Sertifikat Peserta Workshop Multimedia MAGE 9 2023",
        caption: "Sertifikat kepesertaan Workshop Multimedia MAGE 9, Teknik Komputer ITS.",
      },
    ],
  },
  {
    id: "lkmw-td",
    title: "Basic Student Entrepreneurship Skills Training (LKMW-TD)",
    role: "Training",
    period: "November 2022",
    bullets: [],
    featured: true,
    documents: [
      {
        url: "/training/pkti_td/Mahija Ibad Pradipta_Sertifikat LKMW 2022.pdf",
        title: "Sertifikat Pelatihan LKMW 2022 — ITS",
        caption: "Sertifikat Pelatihan Keterampilan Manajemen Wirausaha (LKMW) 2022 Direktorat Kemahasiswaan ITS.",
      },
    ],
  },
  {
    id: "pkti-td",
    title: "Basic Scientific Writing Training (PKTI-TD)",
    role: "Training",
    period: "October 2022",
    bullets: [],
    featured: true,
    documents: [
      {
        url: "/training/pkti_td/Mahija Ibad Pradipta_Sertif_Pelatihan PKTI-TD.pdf",
        title: "Sertifikat Pelatihan PKTI-TD — ITS",
        caption: "Sertifikat Pelatihan Karya Tulis Ilmiah Tingkat Dasar (PKTI-TD) ITS.",
      },
    ],
  },
]

export function getOrganizations(_lang: "en" | "id" = "en"): CareerItem[] {
  return organizations
}

export function getCommittees(_lang: "en" | "id" = "en"): CareerItem[] {
  return committees
}

export function getTraining(_lang: "en" | "id" = "en"): CareerItem[] {
  return training
}

export function getAwards(_lang: "en" | "id" = "en"): AwardItem[] {
  return awards
}
