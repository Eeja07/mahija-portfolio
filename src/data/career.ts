export interface PlaceholderSlot {
  title: string
  caption: string
}

export interface CareerItem {
  id: string
  title: string
  role: string
  period: string
  summary: string
  bullets: string[]
  featured: boolean
  photoPlaceholder?: PlaceholderSlot
  certificatePlaceholder?: PlaceholderSlot
}

export interface AwardItem {
  title: string
  competition: string
  period: string
  summary: string
  bullets: string[]
  photoPlaceholder?: PlaceholderSlot
  certificatePlaceholder?: PlaceholderSlot
  instagramUrl?: string
}

export const organizations: CareerItem[] = [
  {
    "id": "m-iot-coordinator",
    "title": "M-IOT Laboratory — Computer Engineering ITS",
    "role": "Coordinator - Board of Directors",
    "period": "Jun 2025 – May 2026",
    "summary": "Supervised project development, human resource training, and overall administrative timelines for the laboratory.",
    "bullets": [
      "Improved laboratory quality in both project development and human resource development aspects",
      "Supervised overall timelines and task execution across all divisions and subdivisions",
      "Coordinated laboratory management activities with external stakeholders and university administration"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "M-IOT Laboratory Activities",
      "caption": "Photo documentation of laboratory operations, research projects, and member coordination."
    },
    "certificatePlaceholder": {
      "title": "Laboratory Coordinator Appointment Decree",
      "caption": "Official appointment letter / SK for Coordinator of M-IOT Laboratory ITS."
    }
  },
  {
    "id": "banyubramanta-official-head",
    "title": "Banyubramanta Robotics Team ITS",
    "role": "Head of Official Division - Board of Directors",
    "period": "Jul 2024 – May 2025",
    "summary": "Led financial management, public relations, branding, and non-technical logistics for the robotics team.",
    "bullets": [
      "Led the Administration & Finance, Public Relations & Sponsorship, and Creative & Branding subdivisions",
      "Planned and supervised overall timelines and task execution across all subdivisions",
      "Ensured smooth execution of the team’s administrative and non-technical operations"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Robotics Team Operations Photo",
      "caption": "Photo documentation of team briefings, sponsor meetings, and event organization."
    },
    "certificatePlaceholder": {
      "title": "Head of Official Division Certificate",
      "caption": "Official certificate of organizational leadership from Banyubramanta Robotics Team ITS."
    }
  },
  {
    "id": "himatekkom-cadre-head",
    "title": "HIMATEKKOM ITS",
    "role": "Head of Cadre Sub-bureau - Internal Department",
    "period": "Mar 2024 – Feb 2025",
    "summary": "Directed cadre onboarding programs and leadership development initiatives for computer engineering undergraduates.",
    "bullets": [
      "Designed cadre development curricula aligned with organizational values",
      "Supervised cadre mentoring sessions and evaluated member progression",
      "Facilitated internal department coordination and leadership workshops"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Cadre Training & Mentoring Photo",
      "caption": "Photo documentation of student leadership sessions and cadre evaluations."
    },
    "certificatePlaceholder": {
      "title": "Head of Cadre Appointment Letter",
      "caption": "Official organizational decree / certificate from HIMATEKKOM ITS."
    }
  },
  {
    "id": "banyubramanta-senior-finance",
    "title": "Banyubramanta Robotics Team ITS",
    "role": "Senior Staff of Administration and Finance",
    "period": "Aug 2023 – Jun 2024",
    "summary": "Managed budget allocation, financial auditing, and procurement records for robotics competition seasons.",
    "bullets": [
      "Audited division cash flows, receipts, and sponsorship disbursements",
      "Prepared institutional grant proposals and budget accountability reports",
      "Streamlined reimbursement workflows for technical hardware procurement"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Finance & Logistics Photo",
      "caption": "Photo documentation of team financial auditing and procurement coordination."
    },
    "certificatePlaceholder": {
      "title": "Senior Finance Staff Certificate",
      "caption": "Certificate of service from Banyubramanta Robotics Team ITS."
    }
  }
]

export const organizationsId: CareerItem[] = [
  {
    "id": "m-iot-coordinator",
    "title": "Laboratorium M-IOT — Teknik Komputer ITS",
    "role": "Koordinator - Dewan Direksi",
    "period": "Jun 2025 – Mei 2026",
    "summary": "Mengawasi pengembangan proyek, pelatihan sumber daya manusia, dan lini masa administratif laboratorium.",
    "bullets": [
      "Meningkatkan mutu laboratorium baik dalam aspek pengembangan proyek maupun pengembangan SDM",
      "Mengawasi keseluruhan lini masa dan eksekusi tugas di seluruh divisi dan subdivisi",
      "Mengoordinasikan kegiatan pengelolaan laboratorium dengan pihak eksternal dan pimpinan departemen"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Kegiatan Lab M-IOT",
      "caption": "Dokumentasi foto operasional laboratorium, riset proyek, dan koordinasi asisten."
    },
    "certificatePlaceholder": {
      "title": "Surat Keputusan Koordinator Lab",
      "caption": "Surat keputusan resmi pengangkatan Koordinator Laboratorium M-IOT FTEIC ITS."
    }
  },
  {
    "id": "banyubramanta-official-head",
    "title": "Tim Robotika Banyubramanta ITS",
    "role": "Kepala Divisi Official - Dewan Direksi",
    "period": "Jul 2024 – Mei 2025",
    "summary": "Memimpin pengelolaan keuangan, hubungan masyarakat, penjenamaan, dan logistik non-teknis tim robotika.",
    "bullets": [
      "Memimpin subdivisi Administrasi & Keuangan, Humas & Sponsorship, serta Kreatif & Branding",
      "Merencanakan dan mengawasi keseluruhan lini masa serta eksekusi tugas seluruh subdivisi",
      "Memastikan kelancaran operasional administratif dan non-teknis tim dalam berbagai kompetisi"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Operasional Tim Robotika",
      "caption": "Dokumentasi foto rapat divisi, koordinasi sponsorship, dan manajemen tim."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Kepala Divisi Official",
      "caption": "Sertifikat kepengurusan resmi dari Tim Robotika Banyubramanta ITS."
    }
  },
  {
    "id": "himatekkom-cadre-head",
    "title": "HIMATEKKOM ITS",
    "role": "Kepala Sub-biro Kaderisasi - Departemen Internal",
    "period": "Mar 2024 – Feb 2025",
    "summary": "Mengarahkan program kaderisasi dan inisiatif pengembangan kepemimpinan mahasiswa Teknik Komputer.",
    "bullets": [
      "Merancang kurikulum kaderisasi yang selaras dengan nilai-nilai organisasi",
      "Mengawasi sesi pembinaan kader dan mengevaluasi perkembangan anggota",
      "Memfasilitasi koordinasi internal departemen serta lokakarya kepemimpinan"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Pelatihan & Kaderisasi",
      "caption": "Dokumentasi foto sesi pembinaan kader dan evaluasi angkatan mahasiswa."
    },
    "certificatePlaceholder": {
      "title": "Surat Keputusan Kepala Sub-biro Kaderisasi",
      "caption": "Surat keputusan kepengurusan resmi dari HIMATEKKOM ITS."
    }
  },
  {
    "id": "banyubramanta-senior-finance",
    "title": "Tim Robotika Banyubramanta ITS",
    "role": "Staf Senior Administrasi dan Keuangan",
    "period": "Agu 2023 – Jun 2024",
    "summary": "Mengelola alokasi anggaran, audit keuangan, dan pencatatan pengadaan untuk musim kompetisi robotika.",
    "bullets": [
      "Mengaudit arus kas divisi, tanda terima, dan pencairan dana sponsor",
      "Menyusun proposal hibah institusional dan laporan pertanggungjawaban anggaran",
      "Mengoptimalkan alur reimbursement untuk pengadaan perangkat keras teknis"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Foto Administrasi & Keuangan",
      "caption": "Dokumentasi foto audit pembukuan dan pengadaan teknis tim robotika."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Staf Senior Keuangan",
      "caption": "Sertifikat apresiasi kepengurusan dari Tim Robotika Banyubramanta ITS."
    }
  }
]

export const committees: CareerItem[] = [
  {
    "id": "wisuda-128-lo",
    "title": "Wisuda ke-128 ITS Surabaya",
    "role": "Staff - Liaison Officer (LO)",
    "period": "Sep 2023 – Okt 2023",
    "summary": "Managed graduate cohort guidance, ceremonial stage coordination, and VIP protocol during graduation sessions.",
    "bullets": [
      "Guided and accompanied graduating students throughout all formal commencement agenda items",
      "Maintained coordination with stage managers to ensure precise schedule adherence",
      "Assisted VIP guests and department dignitaries with seating protocols and logistical support"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Commencement LO Photo",
      "caption": "Photo documentation of ceremonial stage escort and graduate guidance."
    },
    "certificatePlaceholder": {
      "title": "Commencement 128 Committee Certificate",
      "caption": "Official committee certificate from Institut Teknologi Sepuluh Nopember."
    }
  },
  {
    "id": "its-youth-technopreneur",
    "title": "ITS Youth Technopreneur (IYT) 2023",
    "role": "Staff - Kesekretariatan & Liaison Officer",
    "period": "Agu 2023 – Nov 2023",
    "summary": "Oversaw proposal submissions, participant correspondence, and scoring tabulation for a national entrepreneurship competition.",
    "bullets": [
      "Managed registration datasets and administrative verification for hundreds of participating teams",
      "Coordinated jury communications, rubric distribution, and score tabulation during final pitching rounds",
      "Drafted official correspondence, certificates, and event documentation"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Event Secretariat Photo",
      "caption": "Photo documentation of business pitching rounds and jury score tabulations."
    },
    "certificatePlaceholder": {
      "title": "IYT 2023 Committee Certificate",
      "caption": "Official committee certificate from Direktorat Kemahasiswaan ITS."
    }
  },
  {
    "id": "schematics-2023",
    "title": "Schematics 2023 — FTEIC ITS",
    "role": "Staff - Event & Logistics",
    "period": "Mei 2023 – Okt 2023",
    "summary": "Supported technical arena setup, network testing, and participant flow for the National Logic Competition (NLC).",
    "bullets": [
      "Prepared physical and virtual competition arenas for thousands of nationwide participants",
      "Coordinated with network engineers to verify low-latency online testing platforms",
      "Managed on-site logistical distribution for competition rounds and closing ceremonies"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Technical Arena & Logistics Photo",
      "caption": "Photo documentation of competition arena setup and participant flow control."
    },
    "certificatePlaceholder": {
      "title": "Schematics 2023 Committee Certificate",
      "caption": "Official committee certificate from FTEIC ITS."
    }
  },
  {
    "id": "banyubramanta-internship-sc",
    "title": "Banyubramanta Open Recruitment & Cadre Program",
    "role": "Steering Committee",
    "period": "Nov 2023 – Des 2023",
    "summary": "Designed assessment matrices and supervised technical task evaluation for prospective robotics team recruits.",
    "bullets": [
      "Drafted technical problem sets covering microcontroller programming and circuit design",
      "Supervised interview sessions and provided structured feedback on candidate presentations",
      "Monitored onboarding milestones to ensure high retention and skill readiness"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Steering Committee Mentoring Photo",
      "caption": "Photo documentation of recruit task evaluation and technical interview sessions."
    },
    "certificatePlaceholder": {
      "title": "Steering Committee Assignment Letter",
      "caption": "Official committee letter / certificate from Banyubramanta Robotics Team ITS."
    }
  }
]

export const committeesId: CareerItem[] = [
  {
    "id": "wisuda-128-lo",
    "title": "Wisuda ke-128 ITS Surabaya",
    "role": "Staf - Liaison Officer (LO)",
    "period": "Sep 2023 – Okt 2023",
    "summary": "Mengelola pendampingan wisudawan, koordinasi panggung upacara, dan protokol VIP selama sesi wisuda.",
    "bullets": [
      "Mendampingi dan mengarahkan wisudawan sepanjang seluruh agenda prosesi wisuda resmi",
      "Menjaga koordinasi dengan stage manager untuk memastikan ketepatan jadwal acara",
      "Membantu tamu VIP dan pimpinan departemen terkait protokol tempat duduk dan dukungan logistik"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto LO Prosesi Wisuda",
      "caption": "Dokumentasi foto pendampingan wisudawan dan protokol panggung upacara."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Panitia Wisuda 128 ITS",
      "caption": "Sertifikat kepanitiaan resmi dari Institut Teknologi Sepuluh Nopember."
    }
  },
  {
    "id": "its-youth-technopreneur",
    "title": "ITS Youth Technopreneur (IYT) 2023",
    "role": "Staf - Kesekretariatan & Liaison Officer",
    "period": "Agu 2023 – Nov 2023",
    "summary": "Mengawasi pengumpulan proposal, korespondensi peserta, dan tabulasi penilaian kompetisi wirausaha nasional.",
    "bullets": [
      "Mengelola dataset pendaftaran dan verifikasi administratif untuk ratusan tim peserta",
      "Mengoordinasikan komunikasi dewan juri, distribusi rubrik, dan rekapitulasi nilai babak final pitching",
      "Menyusun surat menyurat resmi, sertifikat, dan dokumentasi kegiatan"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Penjurian & Kesekretariatan",
      "caption": "Dokumentasi foto babak pitching bisnis dan tabulasi skor juri."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Panitia IYT 2023",
      "caption": "Sertifikat kepanitiaan resmi dari Direktorat Kemahasiswaan ITS."
    }
  },
  {
    "id": "schematics-2023",
    "title": "Schematics 2023 — FTEIC ITS",
    "role": "Staf - Acara & Logistik",
    "period": "Mei 2023 – Okt 2023",
    "summary": "Mendukung penyiapan arena teknis, pengujian jaringan, dan alur peserta untuk National Logic Competition (NLC).",
    "bullets": [
      "Menyiapkan arena kompetisi fisik dan virtual untuk ribuan peserta dari seluruh Indonesia",
      "Berkoordinasi dengan tim teknisi jaringan guna memastikan platform ujian online rendah latensi",
      "Mengelola distribusi logistik di lokasi untuk babak perlombaan dan upacara penutupan"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Logistik & Arena Teknis",
      "caption": "Dokumentasi foto penyiapan arena kompetisi dan distribusi perlengkapan peserta."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Panitia Schematics 2023",
      "caption": "Sertifikat kepanitiaan resmi dari FTEIC ITS."
    }
  },
  {
    "id": "banyubramanta-internship-sc",
    "title": "Open Recruitment & Program Kaderisasi Banyubramanta",
    "role": "Steering Committee",
    "period": "Nov 2023 – Des 2023",
    "summary": "Merancang matriks penilaian dan mengawasi evaluasi tugas teknis bagi calon anggota tim robotika.",
    "bullets": [
      "Menyusun lembar soal teknis meliputi pemrograman mikrokontroler dan perancangan sirkuit",
      "Mengawasi sesi wawancara dan memberikan masukan terstruktur atas presentasi kandidat",
      "Memantau capaian onboarding guna memastikan kesiapan keterampilan dan retensi anggota baru"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Foto Evaluasi & Mentoring SC",
      "caption": "Dokumentasi foto wawancara teknis dan pengujian tugas calon anggota tim."
    },
    "certificatePlaceholder": {
      "title": "Surat Tugas Steering Committee",
      "caption": "Surat tugas / sertifikat kepanitiaan dari Tim Robotika Banyubramanta ITS."
    }
  }
]

export const training: CareerItem[] = [
  {
    "id": "lkmm-tm-training",
    "title": "Latihan Keterampilan Manajemen Mahasiswa Tingkat Menengah (LKMM-TM)",
    "role": "Participant",
    "period": "Mei 2024",
    "summary": "Advanced leadership training on organizational policy, conflict resolution, strategic planning, and risk management.",
    "bullets": [
      "Analyzed institutional case studies to formulate comprehensive organizational policies",
      "Formulated strategic risk mitigation models for student activities",
      "Completed intensive crisis management and stakeholder negotiation simulations"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "LKMM-TM Training Session Photo",
      "caption": "Photo documentation of strategic policy simulations and focus group discussions."
    },
    "certificatePlaceholder": {
      "title": "LKMM-TM Management Certificate",
      "caption": "Official Middle-Level Student Management Skills Certificate from Directorate of Student Affairs ITS."
    }
  },
  {
    "id": "lkmm-td-training",
    "title": "Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD)",
    "role": "Participant",
    "period": "Nov 2023",
    "summary": "Core leadership program covering communication dynamics, operational task delegation, and workplan development.",
    "bullets": [
      "Mastered structured decision-making frameworks for operational project teams",
      "Developed Gantt-based execution workplans with measurable key results",
      "Participated in group communication dynamics and feedback loops"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "LKMM-TD Workshop Photo",
      "caption": "Photo documentation of team dynamics, meeting facilitation, and operational planning."
    },
    "certificatePlaceholder": {
      "title": "LKMM-TD Leadership Certificate",
      "caption": "Official Basic Student Management Skills Certificate from Directorate of Student Affairs ITS."
    }
  },
  {
    "id": "pkti-td-training",
    "title": "Pelatihan Keterampilan Karya Tulis Ilmiah Tingkat Dasar (PKTI-TD)",
    "role": "Participant",
    "period": "Okt 2023",
    "summary": "Academic research training focusing on scientific methodology, paper structure, and systematic literature review.",
    "bullets": [
      "Constructed research proposals adhering to national scientific journal standards",
      "Applied systematic literature synthesis and bibliographic citation management",
      "Conducted hypothesis formulation and qualitative/quantitative data structuring"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Scientific Research Session Photo",
      "caption": "Photo documentation of scientific proposal drafting and peer-review defense."
    },
    "certificatePlaceholder": {
      "title": "PKTI-TD Scientific Writing Certificate",
      "caption": "Official scientific writing certification from Directorate of Student Affairs ITS."
    }
  },
  {
    "id": "lkmm-pre-basic",
    "title": "Latihan Keterampilan Manajemen Mahasiswa Pra-Tingkat Dasar (LKMM Pra-TD)",
    "role": "Participant",
    "period": "Sep 2022",
    "summary": "Foundational student workshop on self-management, goal setting, and effective interpersonal communication.",
    "bullets": [
      "Formulated personal development targets and academic prioritization matrices",
      "Practiced active listening and constructive collaboration in multidisciplinary groups",
      "Learned basic time management techniques for demanding engineering curricula"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Foundation Workshop Photo",
      "caption": "Photo documentation of goal-setting and self-management group activities."
    },
    "certificatePlaceholder": {
      "title": "LKMM Pra-TD Certificate",
      "caption": "Official foundation student leadership certificate from Directorate of Student Affairs ITS."
    }
  },
  {
    "id": "mage-workshop",
    "title": "Multimedia and Game Event (MAGE 9) Technical Workshop",
    "role": "Participant",
    "period": "Agu 2023",
    "summary": "Technical workshop focusing on API design, backend validation, and game engine database integration.",
    "bullets": [
      "Implemented RESTful endpoints with input validation middleware",
      "Explored persistent database schema patterns for game data synchronization",
      "Integrated third-party authentication tokens within client-server workflows"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "MAGE 9 Workshop Photo",
      "caption": "Photo documentation of backend API architecture and database integration sessions."
    },
    "certificatePlaceholder": {
      "title": "MAGE 9 Workshop Certificate",
      "caption": "Official technical workshop certificate from Department of Computer Engineering ITS."
    }
  },
  {
    "id": "lkmw-td-training",
    "title": "Latihan Keterampilan Manajemen Wirausaha Tingkat Dasar (LKMW-TD)",
    "role": "Participant",
    "period": "Nov 2023",
    "summary": "Entrepreneurship training covering Business Model Canvas (BMC), financial projections, and product validation.",
    "bullets": [
      "Drafted comprehensive BMC frameworks for technology-driven startup concepts",
      "Calculated unit economics, customer acquisition costs, and revenue models",
      "Presented competitive market analysis and product value propositions to mentors"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Entrepreneurship Pitch Photo",
      "caption": "Photo documentation of Business Model Canvas presentation and mentor pitch."
    },
    "certificatePlaceholder": {
      "title": "LKMW-TD Technopreneurship Certificate",
      "caption": "Official entrepreneurship training certificate from Directorate of Student Affairs ITS."
    }
  }
]

export const trainingId: CareerItem[] = [
  {
    "id": "lkmm-tm-training",
    "title": "Latihan Keterampilan Manajemen Mahasiswa Tingkat Menengah (LKMM-TM)",
    "role": "Peserta",
    "period": "Mei 2024",
    "summary": "Pelatihan kepemimpinan tingkat lanjut mengenai kebijakan organisasi, resolusi konflik, perencanaan strategis, dan manajemen risiko.",
    "bullets": [
      "Menganalisis studi kasus kelembagaan untuk merumuskan kebijakan organisasi yang komprehensif",
      "Menyusun model mitigasi risiko strategis untuk keberlangsungan kegiatan kemahasiswaan",
      "Menyelesaikan simulasi intensif manajemen krisis dan negosiasi pemangku kepentingan"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Sesi Pelatihan LKMM-TM",
      "caption": "Dokumentasi foto simulasi kebijakan strategis dan forum diskusi kelompok."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Kelulusan LKMM-TM",
      "caption": "Sertifikat resmi Pelatihan Keterampilan Manajemen Mahasiswa Tingkat Menengah dari Ditmawa ITS."
    }
  },
  {
    "id": "lkmm-td-training",
    "title": "Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD)",
    "role": "Peserta",
    "period": "Nov 2023",
    "summary": "Program kepemimpinan dasar mencakup dinamika komunikasi, pendelegasian tugas operasional, dan penyusunan rencana kerja.",
    "bullets": [
      "Menguasai kerangka pengambilan keputusan terstruktur untuk tim proyek operasional",
      "Menyusun rencana kerja eksekusi berbasis Gantt Chart dengan indikator capaian terukur",
      "Berpartisipasi aktif dalam dinamika komunikasi kelompok dan siklus umpan balik konstruktif"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Lokakarya LKMM-TD",
      "caption": "Dokumentasi foto dinamika kelompok, simulasi rapat, dan perancangan rencana kerja."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Kelulusan LKMM-TD",
      "caption": "Sertifikat resmi Pelatihan Keterampilan Manajemen Mahasiswa Tingkat Dasar dari Ditmawa ITS."
    }
  },
  {
    "id": "pkti-td-training",
    "title": "Pelatihan Keterampilan Karya Tulis Ilmiah Tingkat Dasar (PKTI-TD)",
    "role": "Peserta",
    "period": "Okt 2023",
    "summary": "Pelatihan riset akademik yang berfokus pada metodologi ilmiah, struktur artikel, dan tinjauan pustaka sistematis.",
    "bullets": [
      "Menyusun proposal penelitian yang mematuhi standar penulisan jurnal ilmiah nasional",
      "Menerapkan sintesis literatur sistematis dan manajemen sitasi bibliografi",
      "Melakukan perumusan hipotesis serta penataan data kualitatif dan kuantitatif"
    ],
    "featured": true,
    "photoPlaceholder": {
      "title": "Foto Pelatihan Riset Ilmiah",
      "caption": "Dokumentasi foto penyusunan proposal penelitian ilmiah dan sidang kelompok."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Pelatihan PKTI-TD",
      "caption": "Sertifikat resmi Pelatihan Karya Tulis Ilmiah dari Direktorat Kemahasiswaan ITS."
    }
  },
  {
    "id": "lkmm-pre-basic",
    "title": "Latihan Keterampilan Manajemen Mahasiswa Pra-Tingkat Dasar (LKMM Pra-TD)",
    "role": "Peserta",
    "period": "Sep 2022",
    "summary": "Lokakarya fondasi mahasiswa mengenai pengelolaan diri, penetapan tujuan, dan komunikasi antarpribadi yang efektif.",
    "bullets": [
      "Merumuskan target pengembangan diri dan matriks prioritas akademik",
      "Mempraktikkan active listening dan kolaborasi konstruktif dalam kelompok multidisiplin",
      "Mempelajari teknik manajemen waktu mendasar untuk kurikulum teknik yang padat"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Foto Lokakarya Fondasi Mahasiswa",
      "caption": "Dokumentasi foto aktivitas manajemen diri dan penetapan sasaran belajar."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat LKMM Pra-TD",
      "caption": "Sertifikat resmi Pelatihan Pra-Tingkat Dasar dari Direktorat Kemahasiswaan ITS."
    }
  },
  {
    "id": "mage-workshop",
    "title": "Lokakarya Teknis Multimedia and Game Event (MAGE 9)",
    "role": "Peserta",
    "period": "Agu 2023",
    "summary": "Lokakarya teknis yang berfokus pada perancangan API, validasi backend, dan integrasi basis data game engine.",
    "bullets": [
      "Mengimplementasikan endpoint RESTful dengan middleware validasi input",
      "Mengeksplorasi pola skema basis data persisten untuk sinkronisasi data game",
      "Mengintegrasikan token autentikasi pihak ketiga dalam alur kerja client-server"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Foto Lokakarya Backend API",
      "caption": "Dokumentasi foto sesi pemrograman API backend dan integrasi database."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Workshop MAGE 9",
      "caption": "Sertifikat partisipasi lokakarya teknis dari Departemen Teknik Komputer ITS."
    }
  },
  {
    "id": "lkmw-td-training",
    "title": "Latihan Keterampilan Manajemen Wirausaha Tingkat Dasar (LKMW-TD)",
    "role": "Peserta",
    "period": "Nov 2023",
    "summary": "Pelatihan kewirausahaan mencakup Business Model Canvas (BMC), proyeksi keuangan, dan validasi produk.",
    "bullets": [
      "Menyusun kerangka BMC komprehensif untuk konsep rintisan usaha berbasis teknologi",
      "Menghitung unit economics, biaya akuisisi pelanggan (CAC), dan model monetisasi",
      "Mempresentasikan analisis pasar kompetitif dan proposisi nilai produk kepada mentor"
    ],
    "featured": false,
    "photoPlaceholder": {
      "title": "Foto Pitching Bisnis Wirausaha",
      "caption": "Dokumentasi foto pemaparan Business Model Canvas di hadapan mentor kewirausahaan."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat LKMW-TD Wirausaha",
      "caption": "Sertifikat resmi pelatihan kewirausahaan mahasiswa dari Ditmawa ITS."
    }
  }
]

export const awards: AwardItem[] = [
  {
    "title": "5th Place - Singapore Autonomous Underwater Vehicle Challenge (SAUVC) 2025",
    "competition": "With Banyubramanta ITS",
    "period": "Mar 2025",
    "summary": "Co-developed the autonomous navigation logic for target localization and pipeline tracking.",
    "bullets": [
      "Validated deep-water computer vision inference scripts under varying light conditions",
      "Designed robust telemetry communication configurations over serial and acoustic links"
    ],
    "photoPlaceholder": {
      "title": "SAUVC Singapore Competition Photo",
      "caption": "Photo documentation of team on pool deck, underwater drone testing, and arena runs."
    },
    "certificatePlaceholder": {
      "title": "SAUVC 2025 Finalist Certificate",
      "caption": "Official international distinction certificate from SAUVC Singapore."
    },
    "instagramUrl": "https://www.instagram.com/banyubramanta.its/"
  },
  {
    "title": "1st Place - Indonesian Underwater Robot Competition National Level 2024",
    "competition": "With Banyubramanta ITS",
    "period": "Jul 2024",
    "summary": "Integrated Real-Time YOLO detection networks onto edge compute modules.",
    "bullets": [
      "Wrote real-time hardware fail-safe routines, protecting the airframe under signal drops",
      "Secured first place out of 40+ competing university teams in speed and accuracy"
    ],
    "photoPlaceholder": {
      "title": "National Championship Podium Photo",
      "caption": "Photo documentation of championship awarding and underwater arena run."
    },
    "certificatePlaceholder": {
      "title": "1st Place National Championship Certificate",
      "caption": "Official national distinction certificate from Puspresnas / BPTI Kemendikbudristek."
    },
    "instagramUrl": "https://www.instagram.com/banyubramanta.its/"
  },
  {
    "title": "3rd Place - Indonesian Underwater Robot Competition Regional Level II 2024",
    "competition": "With Banyubramanta ITS",
    "period": "Jun 2024",
    "summary": "Programmed search-grid waypoint loops for autonomous flight trajectories.",
    "bullets": [
      "Implemented sensor fusion filters combining optical flow with laser altimeters",
      "Configured secure telemetry communication channels to ground control centers"
    ],
    "photoPlaceholder": {
      "title": "Regional II Competition Photo",
      "caption": "Photo documentation of vehicle pool testing and regional qualification."
    },
    "certificatePlaceholder": {
      "title": "3rd Place Regional Certificate",
      "caption": "Official regional distinction certificate from Puspresnas / BPTI Kemendikbudristek."
    },
    "instagramUrl": "https://www.instagram.com/banyubramanta.its/"
  }
]

export const awardsId: AwardItem[] = [
  {
    "title": "Juara 5 - Singapore Autonomous Underwater Vehicle Challenge (SAUVC) 2025",
    "competition": "Bersama Tim Banyubramanta ITS",
    "period": "Mar 2025",
    "summary": "Turut mengembangkan logika navigasi otonom untuk lokalisasi target dan pelacakan pipa bawah air.",
    "bullets": [
      "Memvalidasi skrip inferensi computer vision bawah air pada berbagai kondisi pencahayaan",
      "Merancang konfigurasi komunikasi telemetri yang andal melalui tautan serial dan akustik"
    ],
    "photoPlaceholder": {
      "title": "Foto Arena SAUVC Singapura",
      "caption": "Dokumentasi foto pengujian wahana di kolam kompetisi dan pengerjaan telemetri tim."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Prestasi Finalis SAUVC 2025",
      "caption": "Sertifikat penghargaan resmi tingkat internasional dari komite SAUVC Singapura."
    },
    "instagramUrl": "https://www.instagram.com/banyubramanta.its/"
  },
  {
    "title": "Juara 1 - Kontes Robot Bawah Air Indonesia (KKI) Tingkat Nasional 2024",
    "competition": "Bersama Tim Banyubramanta ITS",
    "period": "Jul 2024",
    "summary": "Mengintegrasikan jaringan deteksi YOLO Real-Time pada modul komputasi edge wahana.",
    "bullets": [
      "Menulis rutinitas fail-safe perangkat keras waktu nyata untuk keamanan wahana saat kehilangan sinyal",
      "Meraih peringkat pertama dari 40+ tim universitas dalam kecepatan dan presisi manuver"
    ],
    "photoPlaceholder": {
      "title": "Foto Juara 1 Tingkat Nasional",
      "caption": "Dokumentasi foto podium juara 1 dan manuver wahana di kolam perlombaan."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Juara 1 Nasional KKI 2024",
      "caption": "Sertifikat penghargaan resmi dari Puspresnas / BPTI Kemendikbudristek RI."
    },
    "instagramUrl": "https://www.instagram.com/banyubramanta.its/"
  },
  {
    "title": "Juara 3 - Kontes Robot Bawah Air Indonesia (KKI) Wilayah II 2024",
    "competition": "Bersama Tim Banyubramanta ITS",
    "period": "Jun 2024",
    "summary": "Memprogram lintasan waypoint grid pencarian untuk trajektori otonom wahana bawah air.",
    "bullets": [
      "Menerapkan filter fusi sensor menggabungkan optical flow dengan laser altimeter",
      "Mengonfigurasi saluran komunikasi telemetri terenkripsi ke stasiun kendali darat"
    ],
    "photoPlaceholder": {
      "title": "Foto Perlombaan KKI Wilayah II",
      "caption": "Dokumentasi foto pengujian lintasan grid pencarian wahana bawah air."
    },
    "certificatePlaceholder": {
      "title": "Sertifikat Juara 3 Wilayah II",
      "caption": "Sertifikat penghargaan resmi dari Puspresnas / BPTI Kemendikbudristek RI."
    },
    "instagramUrl": "https://www.instagram.com/banyubramanta.its/"
  }
]

export function getOrganizations(lang: "en" | "id" = "en"): CareerItem[] {
  return lang === "id" ? organizationsId : organizations
}

export function getCommittees(lang: "en" | "id" = "en"): CareerItem[] {
  return lang === "id" ? committeesId : committees
}

export function getTraining(lang: "en" | "id" = "en"): CareerItem[] {
  return lang === "id" ? trainingId : training
}

export function getAwards(lang: "en" | "id" = "en"): AwardItem[] {
  return lang === "id" ? awardsId : awards
}
