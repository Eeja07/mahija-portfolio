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
