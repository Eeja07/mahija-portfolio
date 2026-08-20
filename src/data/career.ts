export interface CareerItem {
  id: string
  title: string
  role: string
  period: string
  summary: string
  bullets: string[]
  featured: boolean
}

export const organizations: CareerItem[] = [
  {
    id: "m-iot-coordinator",
    title: "M-IOT Laboratory — Computer Engineering ITS",
    role: "Coordinator - Board of Directors",
    period: "Jun 2025 – May 2026",
    summary: "Supervised project development, human resource training, and overall administrative timelines for the laboratory.",
    bullets: [
      "Improved laboratory quality in both project development and human resource development aspects",
      "Supervised overall timelines and task execution across all divisions and subdivisions",
      "Coordinated laboratory management activities with external stakeholders and university administration"
    ],
    featured: true
  },
  {
    id: "himatekkom-cadre-head",
    title: "HIMATEKKOM ITS",
    role: "Head of Cadre Development Department - Board of Directors",
    period: "Mar 2025 – Feb 2026",
    summary: "Directed the cadre development division, mentoring team committees, and coordinating student progression systems.",
    bullets: [
      "Guided IC and OC teams in executing all cadre development activities",
      "Mentored SC members in designing assessment systems and activity timelines",
      "Coordinated with students and the Computer Engineering Department regarding cadre development activities"
    ],
    featured: true
  },
  {
    id: "banyubramanta-official-head",
    title: "Banyubramanta Robotics Team ITS",
    role: "Head of Official Division - Board of Directors",
    period: "Jul 2024 – May 2025",
    summary: "Led financial management, public relations, branding, and non-technical logistics for the robotics team.",
    bullets: [
      "Led the Administration & Finance, Public Relations & Sponsorship, and Creative & Branding subdivisions",
      "Planned and supervised overall timelines and task execution across all subdivisions",
      "Ensured smooth execution of the team’s administrative and non-technical operations"
    ],
    featured: true
  },
  {
    id: "m-iot-archive-staff",
    title: "M-IOT Laboratory — Computer Engineering ITS",
    role: "Archive Staff - Internal Division",
    period: "Aug 2024 – Jun 2025",
    summary: "Managed academic archives, exam repositories, and learning resources for the M-IOT Lab specialization.",
    bullets: [
      "Managed archives of thesis topics and telematics projects conducted by M-IOT Laboratory assistants",
      "Maintained archives of midterm and final examination materials for M-IOT specialization courses",
      "Compiled learning materials for M-IOT specialization courses"
    ],
    featured: false
  },
  {
    id: "himatekkom-sec-treasurer-staff",
    title: "HIMATEKKOM ITS",
    role: "Secretary and Treasurer Staff - Board of Directors",
    period: "Mar 2024 – Mar 2025",
    summary: "Coordinated general department administration, meeting minutes, and financial documentation.",
    bullets: [
      "Coordinated with the Computer Engineering Department regarding organizational administration",
      "Prepared outgoing letters, meeting minutes, and certificate submissions for organizational activities",
      "Maintained archives of important documents in both digital and physical formats"
    ],
    featured: false
  },
  {
    id: "himatekkom-cadre-sc",
    title: "HIMATEKKOM ITS",
    role: "Steering Committee Staff - Cadre Development Department",
    period: "Apr 2024 – Dec 2024",
    summary: "Designed assessment matrices and timelines for student development pathways.",
    bullets: [
      "Coordinated with IC (Instructor Committee) and OC (Organizing Committee) regarding cadre development activities",
      "Designed student assessment systems and overall cadre development timelines",
      "Coordinated with students and the Computer Engineering Department regarding cadre development activities"
    ],
    featured: false
  },
  {
    id: "banyubramanta-senior-finance",
    title: "Banyubramanta Robotics Team ITS",
    role: "Senior Finance Staff - Official Division",
    period: "Feb 2023 – Jul 2024",
    summary: "Managed budget allocations, expenditures, and financial accountability reports.",
    bullets: [
      "Recorded team income and expenditures",
      "Managed team budget allocation",
      "Prepared accountability reports, financial reports, and budget plans"
    ],
    featured: false
  },
  {
    id: "banyubramanta-finance-intern",
    title: "Banyubramanta Robotics Team ITS",
    role: "Finance and Administration Intern - Official Division",
    period: "Nov 2022 – Jan 2023",
    summary: "Drafted proposals, sponsorship plans, and social media content updates.",
    bullets: [
      "Prepared sponsorship and administrative proposals",
      "Prepared contracts, accountability reports, and budget plans",
      "Created content for the team’s social media platforms"
    ],
    featured: false
  },
  {
    id: "its-robotics-club-member",
    title: "ITS Robotics Club",
    role: "Member",
    period: "Sep 2022 – Feb 2023",
    summary: "Participated actively in robotics workshops and team training schedules.",
    bullets: [
      "Actively participated in organizational programs and activities"
    ],
    featured: false
  },
  {
    id: "its-ibc-club-member",
    title: "ITS IBC Club",
    role: "Member",
    period: "Sep 2022 – Sep 2023",
    summary: "Participated in business development and networking events.",
    bullets: [
      "Actively participated in organizational programs and activities"
    ],
    featured: false
  }
]

export const organizationsId: CareerItem[] = [
  {
    id: "m-iot-coordinator",
    title: "Laboratorium M-IOT — Teknik Komputer ITS",
    role: "Koordinator - Dewan Pengurus Harian",
    period: "Jun 2025 – Mei 2026",
    summary: "Mengawasi pengembangan proyek, pelatihan sumber daya manusia, dan jadwal administratif laboratorium secara keseluruhan.",
    bullets: [
      "Meningkatkan kualitas laboratorium baik dalam aspek pengembangan proyek maupun pengembangan sumber daya manusia",
      "Mengawasi linimasa keseluruhan dan eksekusi tugas di seluruh divisi dan subdivisi",
      "Mengoordinasikan kegiatan manajemen laboratorium dengan pihak eksternal dan administrasi institut"
    ],
    featured: true
  },
  {
    id: "himatekkom-cadre-head",
    title: "HIMATEKKOM ITS",
    role: "Kepala Departemen Kaderisasi - Dewan Pengurus Harian",
    period: "Mar 2025 – Feb 2026",
    summary: "Memimpin divisi kaderisasi, membina panitia pelaksana, dan menyusun sistem perkembangan mahasiswa.",
    bullets: [
      "Membimbing tim IC dan OC dalam melaksanakan seluruh rangkaian kegiatan kaderisasi",
      "Membina anggota SC dalam merancang sistem penilaian dan linimasa kegiatan",
      "Mengoordinasikan kegiatan kaderisasi dengan mahasiswa dan Departemen Teknik Komputer"
    ],
    featured: true
  },
  {
    id: "banyubramanta-official-head",
    title: "Tim Robotika Banyubramanta ITS",
    role: "Kepala Divisi Official - Dewan Pengurus",
    period: "Jul 2024 – Mei 2025",
    summary: "Memimpin manajemen keuangan, hubungan masyarakat, branding, dan logistik non-teknis tim robotika.",
    bullets: [
      "Memimpin subdivisi Administrasi & Keuangan, Hubungan Masyarakat & Sponsorship, serta Kreatif & Branding",
      "Merencanakan dan mengawasi linimasa kerja serta eksekusi tugas di seluruh subdivisi",
      "Memastikan kelancaran operasional administratif dan non-teknis tim"
    ],
    featured: true
  },
  {
    id: "m-iot-archive-staff",
    title: "Laboratorium M-IOT — Teknik Komputer ITS",
    role: "Staf Arsip - Divisi Internal",
    period: "Agu 2024 – Jun 2025",
    summary: "Mengelola arsip akademik, repositori ujian, dan sumber belajar untuk peminatan Lab M-IOT.",
    bullets: [
      "Mengelola arsip topik tugas akhir dan proyek telematika yang dikerjakan oleh asisten Laboratorium M-IOT",
      "Memelihara arsip materi ujian tengah semester dan akhir semester untuk mata kuliah peminatan M-IOT",
      "Menyusun materi pembelajaran untuk mata kuliah peminatan M-IOT"
    ],
    featured: false
  },
  {
    id: "himatekkom-sec-treasurer-staff",
    title: "HIMATEKKOM ITS",
    role: "Staf Sekretaris & Bendahara - BPH",
    period: "Mar 2024 – Mar 2025",
    summary: "Mengoordinasikan administrasi umum himpunan, notulensi rapat, dan dokumentasi keuangan.",
    bullets: [
      "Berkoordinasi dengan Departemen Teknik Komputer mengenai administrasi organisasi",
      "Menyusun surat keluar, notulensi rapat, dan pengajuan sertifikat untuk kegiatan organisasi",
      "Memelihara arsip dokumen penting dalam format digital maupun fisik"
    ],
    featured: false
  },
  {
    id: "himatekkom-cadre-sc",
    title: "HIMATEKKOM ITS",
    role: "Staf Steering Committee - Departemen Kaderisasi",
    period: "Apr 2024 – Des 2024",
    summary: "Merancang matriks penilaian dan jadwal alur perkembangan mahasiswa baru.",
    bullets: [
      "Berkoordinasi dengan IC (Instructor Committee) dan OC (Organizing Committee) terkait kegiatan kaderisasi",
      "Merancang sistem penilaian mahasiswa dan linimasa kaderisasi secara keseluruhan",
      "Berkoordinasi dengan mahasiswa dan Departemen Teknik Komputer mengenai kegiatan kaderisasi"
    ],
    featured: false
  },
  {
    id: "banyubramanta-senior-finance",
    title: "Tim Robotika Banyubramanta ITS",
    role: "Staf Senior Keuangan - Divisi Official",
    period: "Feb 2023 – Jul 2024",
    summary: "Mengelola alokasi anggaran, pencatatan pengeluaran, dan laporan pertanggungjawaban keuangan.",
    bullets: [
      "Mencatat pemasukan dan pengeluaran tim",
      "Mengelola alokasi anggaran tim",
      "Menyusun laporan pertanggungjawaban (LPJ), laporan keuangan, dan rencana anggaran belanja (RAB)"
    ],
    featured: false
  },
  {
    id: "banyubramanta-finance-intern",
    title: "Tim Robotika Banyubramanta ITS",
    role: "Magang Keuangan & Administrasi - Divisi Official",
    period: "Nov 2022 – Jan 2023",
    summary: "Menyusun proposal sponsorship, rencana administrasi, dan pembaruan konten media sosial.",
    bullets: [
      "Menyusun proposal sponsorship dan administrasi",
      "Menyusun kontrak kerja sama, laporan pertanggungjawaban, dan rencana anggaran",
      "Membuat konten untuk platform media sosial tim"
    ],
    featured: false
  },
  {
    id: "its-robotics-club-member",
    title: "ITS Robotics Club",
    role: "Anggota",
    period: "Sep 2022 – Feb 2023",
    summary: "Berpartisipasi aktif dalam pelatihan dan workshop robotika.",
    bullets: [
      "Berpartisipasi aktif dalam program dan kegiatan organisasi"
    ],
    featured: false
  },
  {
    id: "its-ibc-club-member",
    title: "ITS IBC Club",
    role: "Anggota",
    period: "Sep 2022 – Sep 2023",
    summary: "Mengikuti kegiatan pengembangan bisnis dan jejaring kemitraan.",
    bullets: [
      "Berpartisipasi aktif dalam program dan kegiatan organisasi"
    ],
    featured: false
  }
]

export const committees: CareerItem[] = [
  {
    id: "mage-10-head-event",
    title: "Multimedia And Game Event 10 — Computer Engineering ITS",
    role: "Head of Event Division - Board of Directors",
    period: "Feb 2024 – Feb 2025",
    summary: "Oversaw national multimedia workshops, robotics challenges, guest panels, and the concluding event showcase.",
    bullets: [
      "Guided staff in designing and executing IoT, Multimedia, and Robotics workshops",
      "Guided staff in planning and executing opening ceremonies, talk shows, exhibitions, and closing events",
      "Supervised and evaluated the implementation of workshops, talk shows, exhibitions, opening ceremonies, and closing events"
    ],
    featured: true
  },
  {
    id: "hgts-teaching-staff",
    title: "HGTS X SE 8.0 — HIMATEKKOM ITS",
    role: "Staff - Teaching Division",
    period: "Oct 2023",
    summary: "Planned curriculum and taught image detection and pose detection concepts to local junior high school students.",
    bullets: [
      "Designed learning concepts for students of MTs 19 Surabaya",
      "Prepared presentation materials for teaching activities",
      "Taught image detection and pose detection topics to students of MTs 19 Surabaya"
    ],
    featured: true
  },
  {
    id: "inclenation-mentor-staff",
    title: "Inclenation 2023 — BEM FTEIC ITS",
    role: "Staff - Mentor Division",
    period: "Jun 2023 – Aug 2023",
    summary: "Mentored 20 incoming freshman students through orientation, team integration, and academic guidance.",
    bullets: [
      "Mentored 20 freshmen from 6 departments and 10 study programs within FTEIC",
      "Provided guidance and support to freshmen throughout Inclenation 2023",
      "Served as an internalization facilitator during Inclenation 2023"
    ],
    featured: true
  },
  {
    id: "mage-9-secretariat",
    title: "Multimedia And Game Event 9 — Computer Engineering ITS",
    role: "Staff - Secretariat Division",
    period: "Feb 2023 – Mar 2024",
    summary: "Managed registrations, database entries, documentation, and coordinated specific workshop tracks.",
    bullets: [
      "Managed activity data collection and documentation",
      "Prepared communication materials, attendance records, feedback forms, and meeting minutes",
      "Served as the person in charge of one workshop"
    ],
    featured: false
  },
  {
    id: "isc-badminton-staff",
    title: "ISC - 63rd ITS Anniversary",
    role: "Badminton Staff - Event Division",
    period: "Sep 2023 – Nov 2023",
    summary: "Coordinated schedules, logistics, and match documentation for the inter-faculty badminton tournament.",
    bullets: [
      "Ensured the smooth execution of the inter-faculty badminton tournament",
      "Coordinated match schedules and tournament facilities",
      "Managed documentation and match result records"
    ],
    featured: false
  },
  {
    id: "tdc-summit-fest",
    title: "TDC Summit Fest 2023 — TDC ITS",
    role: "TDC For Startup Staff - Event Division",
    period: "Aug 2023 – Nov 2023",
    summary: "Prepared program guidelines for startup coaching and served as host for bootcamp sessions.",
    bullets: [
      "Prepared implementation and technical guidelines for startup bootcamp mentoring activities",
      "Prepared implementation and technical guidelines for startup bootcamp coaching activities",
      "Served as Master of Ceremony (MC) during startup bootcamp mentoring sessions"
    ],
    featured: false
  },
  {
    id: "sps-graduation-staff",
    title: "SPS 128 — HIMATEKKOM ITS",
    role: "Staff - Event Division",
    period: "Jun 2023 – Sep 2023",
    summary: "Organized FTE ITS Graduation Appreciation plans and served as liaison officer to department heads.",
    bullets: [
      "Prepared implementation and technical guidelines for the 128th FTE ITS Graduation Appreciation Event",
      "Prepared event rundown for the 128th FTE ITS Graduation Appreciation Event",
      "Served as Liaison Officer for the Head of the Computer Engineering Department"
    ],
    featured: false
  }
]

export const committeesId: CareerItem[] = [
  {
    id: "mage-10-head-event",
    title: "Multimedia And Game Event 10 — Teknik Komputer ITS",
    role: "Ketua Divisi Acara - Dewan Pengurus",
    period: "Feb 2024 – Feb 2025",
    summary: "Mengawasi workshop multimedia nasional, kompetisi robotika & IoT, gelar wicara pakar, dan pameran penutupan.",
    bullets: [
      "Membimbing staf dalam merancang dan mengeksekusi workshop IoT, Multimedia, dan Robotika",
      "Membimbing staf dalam merencanakan dan melaksanakan opening ceremony, talkshow, pameran, dan closing event",
      "Mengawasi dan mengevaluasi pelaksanaan workshop, talkshow, pameran, serta acara pembukaan dan penutupan"
    ],
    featured: true
  },
  {
    id: "hgts-teaching-staff",
    title: "HGTS X SE 8.0 — HIMATEKKOM ITS",
    role: "Staf Divisi Pengajar",
    period: "Okt 2023",
    summary: "Merencanakan kurikulum dan mengajarkan konsep deteksi citra dan pose kepada siswa madrasah tsanawiyah.",
    bullets: [
      "Merancang konsep pembelajaran untuk siswa MTsN 19 Surabaya",
      "Menyusun materi presentasi untuk kegiatan pengajaran",
      "Mengajarkan materi deteksi citra dan deteksi pose kepada siswa MTsN 19 Surabaya"
    ],
    featured: true
  },
  {
    id: "inclenation-mentor-staff",
    title: "Inclenation 2023 — BEM FTEIC ITS",
    role: "Staf Divisi Mentor",
    period: "Jun 2023 – Agu 2023",
    summary: "Mementori 20 mahasiswa baru dalam orientasi fakultas, integrasi tim, dan panduan akademik.",
    bullets: [
      "Mendampingi 20 mahasiswa baru dari 6 departemen dan 10 program studi di lingkungan FTEIC",
      "Memberikan bimbingan dan dukungan kepada mahasiswa baru sepanjang rangkaian Inclenation 2023",
      "Bertindak sebagai fasilitator internalisasi selama Inclenation 2023"
    ],
    featured: true
  },
  {
    id: "mage-9-secretariat",
    title: "Multimedia And Game Event 9 — Teknik Komputer ITS",
    role: "Staf Divisi Kesekretariatan",
    period: "Feb 2023 – Mar 2024",
    summary: "Mengelola pendaftaran peserta, basis data kegiatan, dokumentasi, dan penanggung jawab salah satu workshop.",
    bullets: [
      "Mengelola pendataan dan dokumentasi kegiatan",
      "Menyusun materi komunikasi, presensi kehadiran, formulir evaluasi, dan notulensi rapat",
      "Bertindak sebagai penanggung jawab satu sesi workshop"
    ],
    featured: false
  },
  {
    id: "isc-badminton-staff",
    title: "ISC - Dies Natalis ke-63 ITS",
    role: "Staf Badminton - Divisi Acara",
    period: "Sep 2023 – Nov 2023",
    summary: "Mengoordinasikan jadwal pertandingan, logistik lapangan, dan dokumentasi turnamen bulu tangkis antar-fakultas.",
    bullets: [
      "Memastikan kelancaran jalannya turnamen bulu tangkis antar-fakultas",
      "Mengoordinasikan jadwal pertandingan dan fasilitas turnamen",
      "Mengelola dokumentasi dan pencatatan hasil pertandingan"
    ],
    featured: false
  },
  {
    id: "tdc-summit-fest",
    title: "TDC Summit Fest 2023 — TDC ITS",
    role: "Staf TDC For Startup - Divisi Acara",
    period: "Agu 2023 – Nov 2023",
    summary: "Menyusun petunjuk teknis pembinaan startup dan bertindak sebagai pembawa acara pada sesi bootcamp.",
    bullets: [
      "Menyusun petunjuk pelaksanaan dan teknis kegiatan mentoring bootcamp startup",
      "Menyusun petunjuk pelaksanaan dan teknis kegiatan coaching bootcamp startup",
      "Bertindak sebagai Master of Ceremony (MC) selama sesi mentoring bootcamp startup"
    ],
    featured: false
  },
  {
    id: "sps-graduation-staff",
    title: "SPS 128 — HIMATEKKOM ITS",
    role: "Staf Divisi Acara",
    period: "Jun 2023 – Sep 2023",
    summary: "Menyelenggarakan acara syukuran wisuda FTE ITS dan bertindak sebagai narahubung ketua departemen.",
    bullets: [
      "Menyusun petunjuk teknis dan pelaksanaan Acara Syukuran Wisuda ke-128 FTE ITS",
      "Menyusun susunan acara (rundown) Syukuran Wisuda ke-128 FTE ITS",
      "Bertindak sebagai Liaison Officer (LO) untuk Kepala Departemen Teknik Komputer"
    ],
    featured: false
  }
]

export const training: CareerItem[] = [
  {
    id: "lkmm-tm-training",
    title: "Intermediate Student Management Skills Training (LKMM-TM)",
    role: "Management Training",
    period: "Aug 2024",
    summary: "Trained in organizational strategic planning, policy formulation, and administrative audits.",
    bullets: [
      "Completed certified sessions on middle-level organizational policy drafting",
      "Developed strategic management plans for student organizations",
      "Conducted structural diagnostic audits for simulated organizations"
    ],
    featured: true
  },
  {
    id: "lkmm-td-training",
    title: "Basic Student Management Skills Training (LKMM-TD)",
    role: "Leadership Training",
    period: "Nov 2023",
    summary: "Trained in fundamental project coordination, risk management, and team operations.",
    bullets: [
      "Acquired basic leadership and project planning competencies",
      "Prepared operational budget allocations and risk mitigation matrices",
      "Participated in collaborative team alignment simulations"
    ],
    featured: true
  },
  {
    id: "pkti-td-training",
    title: "Basic Scientific Writing Training (PKTI-TD)",
    role: "Scientific Writing",
    period: "Oct 2022",
    summary: "Acquired analytical research skills, formal paper structuring, and scientific citation methods.",
    bullets: [
      "Learned academic research methodology and literary reviews",
      "Structured scientific proposals according to formal standards",
      "Trained in academic writing layout and bibliography tools"
    ],
    featured: true
  },
  {
    id: "lkmm-pre-basic",
    title: "Pre-Basic Student Management Skills Training",
    role: "Leadership Foundation",
    period: "Sep 2023",
    summary: "Studied basic student administrative processes and public speaking frameworks.",
    bullets: [
      "Acquired foundation management concepts for student organizations",
      "Trained in effective speech communication styles",
      "Practiced standard group scheduling and administrative checks"
    ],
    featured: false
  },
  {
    id: "mage-workshop",
    title: "MAGE 9 Multimedia Workshop",
    role: "Workshop Attendee",
    period: "Aug 2023",
    summary: "Learned game design architectures, multimedia production, and interactive logic.",
    bullets: [
      "Studied intermediate database architectures and SQL commands",
      "Connected local backend applications to database endpoints",
      "Learned API validation using testing tool environments"
    ],
    featured: false
  },
  {
    id: "lkmw-td-training",
    title: "Basic Student Entrepreneurship Skills Training (LKMW-TD)",
    role: "Entrepreneurship Training",
    period: "Nov 2022",
    summary: "Learned fundamental business model canvas, target market validation, and pitch planning.",
    bullets: [
      "Studied basic business model generation and market research",
      "Trained in early-stage product validation strategies",
      "Drafted mock startup pitches and financial assumptions"
    ],
    featured: false
  }
]

export const trainingId: CareerItem[] = [
  {
    id: "lkmm-tm-training",
    title: "Latihan Keterampilan Manajemen Mahasiswa Tingkat Menengah (LKMM-TM)",
    role: "Pelatihan Manajemen Strategis",
    period: "Agu 2024",
    summary: "Pelatihan penyusunan rencana strategis organisasi, formulasi kebijakan, dan audit diagnostik struktural.",
    bullets: [
      "Menyelesaikan sesi bersertifikat perumusan kebijakan organisasi tingkat menengah",
      "Mengembangkan rencana manajemen strategis untuk organisasi kemahasiswaan",
      "Melakukan audit diagnostik struktural untuk simulasi organisasi"
    ],
    featured: true
  },
  {
    id: "lkmm-td-training",
    title: "Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD)",
    role: "Pelatihan Kepemimpinan & Operasional",
    period: "Nov 2023",
    summary: "Pelatihan koordinasi proyek dasar, manajemen risiko operasional, dan kepemimpinan tim.",
    bullets: [
      "Memperoleh kompetensi kepemimpinan dasar dan perencanaan proyek",
      "Menyusun alokasi anggaran operasional dan matriks mitigasi risiko",
      "Berpartisipasi dalam simulasi penyelarasan kerja tim kolaboratif"
    ],
    featured: true
  },
  {
    id: "pkti-td-training",
    title: "Pelatihan Karya Tulis Ilmiah Tingkat Dasar (PKTI-TD)",
    role: "Karya Tulis Ilmiah & Riset",
    period: "Okt 2022",
    summary: "Mempelajari metodologi riset analitis, penyusunan proposal ilmiah terstruktur, dan tata sitasi formal.",
    bullets: [
      "Mempelajari metodologi penelitian akademik dan tinjauan pustaka",
      "Menyusun proposal karya ilmiah sesuai standar formal",
      "Mendalami tata letak penulisan akademik dan perkakas bibliografi"
    ],
    featured: true
  },
  {
    id: "lkmm-pre-basic",
    title: "Pelatihan Keterampilan Manajemen Mahasiswa Pra-Dasar",
    role: "Fondasi Kepemimpinan",
    period: "Sep 2023",
    summary: "Mempelajari proses administrasi organisasi mahasiswa dan dasar komunikasi publik yang efektif.",
    bullets: [
      "Memahami konsep dasar manajemen untuk organisasi kemahasiswaan",
      "Dilatih dalam gaya komunikasi dan penyampaian gagasan yang efektif",
      "Mempraktikkan penjadwalan kelompok dan pemeriksaan administrasi standar"
    ],
    featured: false
  },
  {
    id: "mage-workshop",
    title: "Workshop Multimedia MAGE 9",
    role: "Peserta Workshop",
    period: "Agu 2023",
    summary: "Mempelajari arsitektur basis data, integrasi logika multimedia interaktif, dan pengujian API.",
    bullets: [
      "Mempelajari arsitektur basis data tingkat menengah dan perintah SQL",
      "Menghubungkan aplikasi backend lokal ke endpoint basis data",
      "Mempelajari validasi API menggunakan lingkungan alat pengujian"
    ],
    featured: false
  },
  {
    id: "lkmw-td-training",
    title: "Latihan Keterampilan Manajemen Wirausaha Tingkat Dasar (LKMW-TD)",
    role: "Pelatihan Kewirausahaan",
    period: "Nov 2022",
    summary: "Mempelajari kanvas model bisnis fundamental, validasi target pasar, dan perencanaan presentasi pitch.",
    bullets: [
      "Mempelajari pembuatan model bisnis dasar dan riset pasar",
      "Mendalami strategi validasi produk tahap awal",
      "Menyusun draft pitch startup dan asumsi proyeksi keuangan"
    ],
    featured: false
  }
]

export interface AwardItem {
  title: string
  competition: string
  period: string
  summary: string
  bullets: string[]
}

export const awards: AwardItem[] = [
  {
    title: "5th Place - Singapore Autonomous Underwater Vehicle Challenge (SAUVC) 2025",
    competition: "With Banyubramanta ITS",
    period: "Mar 2025",
    summary: "Co-developed the autonomous navigation logic for target localization and pipeline tracking.",
    bullets: [
      "Validated deep-water computer vision inference scripts under varying light conditions",
      "Designed robust telemetry communication configurations over serial and acoustic links"
    ]
  },
  {
    title: "1st Place - Indonesian Underwater Robot Competition National Level 2024",
    competition: "With Banyubramanta ITS",
    period: "Jul 2024",
    summary: "Integrated Real-Time YOLO detection networks onto edge compute modules.",
    bullets: [
      "Wrote real-time hardware fail-safe routines, protecting the airframe under signal drops",
      "Secured first place out of 40+ competing university teams in speed and accuracy"
    ]
  },
  {
    title: "3rd Place - Indonesian Underwater Robot Competition Regional Level II 2024",
    competition: "With Banyubramanta ITS",
    period: "Jun 2024",
    summary: "Programmed search-grid waypoint loops for autonomous flight trajectories.",
    bullets: [
      "Implemented sensor fusion filters combining optical flow with laser altimeters",
      "Configured secure telemetry communication channels to ground control centers"
    ]
  }
]

export const awardsId: AwardItem[] = [
  {
    title: "Juara 5 - Singapore Autonomous Underwater Vehicle Challenge (SAUVC) 2025",
    competition: "Bersama Tim Banyubramanta ITS",
    period: "Mar 2025",
    summary: "Turut mengembangkan logika navigasi otonom untuk lokalisasi target dan pelacakan pipa bawah air.",
    bullets: [
      "Memvalidasi skrip inferensi computer vision bawah air pada berbagai kondisi pencahayaan",
      "Merancang konfigurasi komunikasi telemetri yang andal melalui tautan serial dan akustik"
    ]
  },
  {
    title: "Juara 1 - Kontes Robot Bawah Air Indonesia (KKI) Tingkat Nasional 2024",
    competition: "Bersama Tim Banyubramanta ITS",
    period: "Jul 2024",
    summary: "Mengintegrasikan jaringan deteksi YOLO Real-Time pada modul komputasi edge wahana.",
    bullets: [
      "Menulis rutinitas fail-safe perangkat keras waktu nyata untuk keamanan wahana saat kehilangan sinyal",
      "Meraih peringkat pertama dari 40+ tim universitas dalam kecepatan dan presisi manuver"
    ]
  },
  {
    title: "Juara 3 - Kontes Robot Bawah Air Indonesia (KKI) Wilayah II 2024",
    competition: "Bersama Tim Banyubramanta ITS",
    period: "Jun 2024",
    summary: "Memprogram lintasan waypoint grid pencarian untuk trajektori otonom wahana bawah air.",
    bullets: [
      "Menerapkan filter fusi sensor menggabungkan optical flow dengan laser altimeter",
      "Mengonfigurasi saluran komunikasi telemetri terenkripsi ke stasiun kendali darat"
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
