import { MediaItem } from "@/types/experience"

export interface CareerItem {
  id: string
  title: string
  role: string
  period: string
  summary: string
  bullets: string[]
  featured: boolean
  media?: MediaItem[]
  certificateUrl?: string
  certificateLabel?: string
}

export interface AwardItem {
  title: string
  competition: string
  period: string
  summary: string
  bullets: string[]
  media?: MediaItem[]
  certificateUrl?: string
  certificateLabel?: string
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
    "media": [
      {
        "type": "image",
        "url": "/images/activities/iot-dashboard-screenshot.png",
        "title": "M-IOT Laboratory Project Systems",
        "caption": "Laboratory Research & Telematics System Supervision"
      },
      {
        "type": "image",
        "url": "/images/docs/m-iot-org-doc.svg",
        "title": "M-IOT Coordinator Blueprint",
        "caption": "Research Roadmap, Division Timelines & Lab Asset Management"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/activities/robot-assembly-1.png",
        "title": "Robotics Team Operations & Assembly",
        "caption": "Team Management, Operations & Robotics Assemblies"
      },
      {
        "type": "image",
        "url": "/images/docs/banyubramanta-org-doc.svg",
        "title": "Robotics Official Blueprint",
        "caption": "Team Logistics, Sponsorship Portfolios & Media Branding"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/himatekkom-org-doc.svg",
        "title": "HIMATEKKOM Cadre Leadership Blueprint",
        "caption": "Student Leadership Cadre Curriculum & Competency Matrix"
      },
      {
        "type": "image",
        "url": "/images/evidence/storage.webp",
        "title": "Cadre Scorecard Repository",
        "caption": "Leadership Rubrics & Cohort Progress Archive"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/banyu-finance-doc.svg",
        "title": "Banyubramanta Senior Finance Ledger",
        "caption": "Robotics R&D Budget Allocation, Procurement & Audit Trails"
      },
      {
        "type": "image",
        "url": "/images/evidence/tunnel.webp",
        "title": "Procurement Verification",
        "caption": "Hardware Component Sourcing & Sensor Claim Records"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/activities/iot-dashboard-screenshot.png",
        "title": "Sistem Proyek Lab M-IOT",
        "caption": "Riset Laboratorium & Pengawasan Sistem Telematika"
      },
      {
        "type": "image",
        "url": "/images/docs/m-iot-org-doc.svg",
        "title": "Cetak Biru Koordinator M-IOT",
        "caption": "Peta Riset, Lini Masa Divisi & Manajemen Aset Lab"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/activities/robot-assembly-1.png",
        "title": "Operasional & Perakitan Tim Robotika",
        "caption": "Manajemen Tim, Operasional & Perakitan Wahana Robotika"
      },
      {
        "type": "image",
        "url": "/images/docs/banyubramanta-org-doc.svg",
        "title": "Cetak Biru Divisi Official",
        "caption": "Logistik Tim, Portofolio Sponsorship & Penjenamaan Media"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/himatekkom-org-doc.svg",
        "title": "Cetak Biru Kaderisasi HIMATEKKOM",
        "caption": "Kurikulum Kaderisasi & Matriks Kompetensi Mahasiswa"
      },
      {
        "type": "image",
        "url": "/images/evidence/storage.webp",
        "title": "Repositori Penilaian Kader",
        "caption": "Rubrik Kepemimpinan & Arsip Perkembangan Angkatan"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/banyu-finance-doc.svg",
        "title": "Buku Besar Keuangan Banyubramanta",
        "caption": "Alokasi Anggaran R&D Robotika, Pengadaan & Jejak Audit"
      },
      {
        "type": "image",
        "url": "/images/evidence/tunnel.webp",
        "title": "Verifikasi Pengadaan",
        "caption": "Pencatatan Komponen Hardware & Klaim Sensor Wahana"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/committee-wisuda-doc.svg",
        "title": "Wisuda 128 Operations Blueprint",
        "caption": "Ceremonial Flow, VIP Protocol & Section Coordination"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/committee-iyt-doc.svg",
        "title": "ITS Youth Technopreneur Event Blueprint",
        "caption": "National Business Pitching Stage & Competition Secretariat"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/committee-schematics-doc.svg",
        "title": "Schematics 2023 Tech Logistics Blueprint",
        "caption": "National Logic & Programming Competition Arena Coordination"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/activities/robot-assembly-2.png",
        "title": "Robotics Cadre Mentoring",
        "caption": "Cadre Training & Hardware Assessments"
      },
      {
        "type": "image",
        "url": "/images/docs/committee-banyu-sc-doc.svg",
        "title": "Cadre Steering Committee Blueprint",
        "caption": "Cadre Onboarding Rubric & Robotics Hardware Evaluation"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/committee-wisuda-doc.svg",
        "title": "Cetak Biru Operasional Wisuda 128",
        "caption": "Alur Prosesi, Protokol VIP & Koordinasi Lapangan"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/committee-iyt-doc.svg",
        "title": "Cetak Biru Kegiatan ITS Youth Technopreneur",
        "caption": "Panggung Pitching Bisnis Nasional & Sekretariat Acara"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/committee-schematics-doc.svg",
        "title": "Cetak Biru Logistik Teknis Schematics 2023",
        "caption": "Koordinasi Arena Kompetisi Logika & Pemrograman Nasional"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/activities/robot-assembly-2.png",
        "title": "Mentoring Kader Robotika",
        "caption": "Pelatihan Kader & Penilaian Tugas Perangkat Keras"
      },
      {
        "type": "image",
        "url": "/images/docs/committee-banyu-sc-doc.svg",
        "title": "Cetak Biru Steering Committee Kader",
        "caption": "Rubrik Onboarding Kader & Evaluasi Perangkat Keras Robotika"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmm-tm-doc.svg",
        "title": "LKMM-TM Strategic Blueprint",
        "caption": "Strategic Organization Policy, Conflict Resolution & SWOT Matrix"
      },
      {
        "type": "image",
        "url": "/images/evidence/storage.webp",
        "title": "Policy Simulation Archive",
        "caption": "Intermediate Student Management Skills Training Module"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmm-td-doc.svg",
        "title": "LKMM-TD Leadership Blueprint",
        "caption": "Task Management, Group Communication & Operational Planning"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/pkti-td-doc.svg",
        "title": "PKTI-TD Scientific Research Blueprint",
        "caption": "Methodology Design, Scientific Citation & Peer-Review Framework"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmm-pra-td-doc.svg",
        "title": "LKMM Pra-TD Foundation Roadmap",
        "caption": "Self-Management, Goal Setting & Time Organization Systems"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/mage-workshop-doc.svg",
        "title": "MAGE 9 API Architecture Workshop",
        "caption": "Backend Validation, Database Schemas & Systems Interfacing"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmw-td-doc.svg",
        "title": "LKMW-TD Entrepreneurship Blueprint",
        "caption": "Business Model Canvas (BMC), Unit Economics & Market Validation"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmm-tm-doc.svg",
        "title": "Cetak Biru Strategis LKMM-TM",
        "caption": "Kebijakan Organisasi, Resolusi Konflik & Analisis SWOT"
      },
      {
        "type": "image",
        "url": "/images/evidence/storage.webp",
        "title": "Arsip Simulasi Kebijakan",
        "caption": "Modul Pelatihan Keterampilan Manajemen Mahasiswa Tingkat Menengah"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmm-td-doc.svg",
        "title": "Cetak Biru Kepemimpinan LKMM-TD",
        "caption": "Manajemen Tugas, Komunikasi Kelompok & Rencana Kerja Operasional"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/pkti-td-doc.svg",
        "title": "Cetak Biru Riset Ilmiah PKTI-TD",
        "caption": "Perancangan Metodologi, Sitasi Ilmiah & Kerangka Peer-Review"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmm-pra-td-doc.svg",
        "title": "Peta Fondasi LKMM Pra-TD",
        "caption": "Manajemen Diri, Penetapan Sasaran & Organisasi Waktu"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/mage-workshop-doc.svg",
        "title": "Lokakarya Arsitektur API MAGE 9",
        "caption": "Validasi Backend, Skema Database & Antarmuka Sistem"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/lkmw-td-doc.svg",
        "title": "Cetak Biru Wirausaha LKMW-TD",
        "caption": "Business Model Canvas (BMC), Unit Economics & Validasi Pasar"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/sauvc-award-doc.svg",
        "title": "SAUVC 2025 Distinction Blueprint",
        "caption": "Singapore Autonomous Underwater Vehicle Challenge 5th Place"
      },
      {
        "type": "image",
        "url": "/images/evidence/drone-field.webp",
        "title": "AUV Navigation Telemetry",
        "caption": "Autonomous Flight / Navigation Path Verification"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/kki-national-award-doc.svg",
        "title": "KKI 2024 National 1st Place Champion",
        "caption": "Edge YOLO Detection & Hardware Fail-Safe Routines"
      },
      {
        "type": "image",
        "url": "/images/activities/yolo-detection-5m.png",
        "title": "Real-time Detection Frame",
        "caption": "Edge Computer Vision Target Classification"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/kki-regional-award-doc.svg",
        "title": "KKI 2024 Regional 3rd Place Distinction",
        "caption": "Waypoint Search-Grid Loops & Sensor Fusion Filtering"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/sauvc-award-doc.svg",
        "title": "Cetak Biru Prestasi SAUVC 2025",
        "caption": "Singapore Autonomous Underwater Vehicle Challenge Peringkat 5 Internasional"
      },
      {
        "type": "image",
        "url": "/images/evidence/drone-field.webp",
        "title": "Telemetri Navigasi AUV",
        "caption": "Verifikasi Trajektori Navigasi Otonom Wahana"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/kki-national-award-doc.svg",
        "title": "Juara 1 Tingkat Nasional KKI 2024",
        "caption": "Inferensi Edge YOLO & Rutinitas Fail-Safe Perangkat Keras"
      },
      {
        "type": "image",
        "url": "/images/activities/yolo-detection-5m.png",
        "title": "Frame Deteksi Waktu Nyata",
        "caption": "Klasifikasi Objek Target Computer Vision Edge"
      }
    ]
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
    "media": [
      {
        "type": "image",
        "url": "/images/docs/kki-regional-award-doc.svg",
        "title": "Juara 3 Wilayah II KKI 2024",
        "caption": "Loop Grid Pencarian Waypoint & Filter Fusi Sensor"
      }
    ]
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
