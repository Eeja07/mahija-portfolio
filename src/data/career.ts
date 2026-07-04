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
    title: "M-IOT Laboratory ITS",
    role: "Systems & IoT Coordinator",
    period: "Sep 2024 — Present",
    summary: "Supervised telemetry deployments, server virtualization systems, and internal member development.",
    bullets: [
      "Administered dockerized Linux host machines, maintaining 99.9% uptime for local database stores",
      "Standardized network topology guides, API gateways, and MQTT publisher architectures for research labs",
      "Mentored junior lab engineers on server environments and microservice structures"
    ],
    featured: true
  },
  {
    id: "head-of-cadre-development",
    title: "HIMATEKKOM",
    role: "Head of Cadre Development",
    period: "2024 — 2025",
    summary: "Directed talent pipelines, leadership training paths, and professional development programs within the department.",
    bullets: [
      "Designed comprehensive recruitment frameworks and personal performance criteria for 100+ members",
      "Facilitated engineering student forums focusing on leadership, technical management, and team collaboration",
      "Supervised inter-division task forces for department training events and structural audits"
    ],
    featured: true
  },
  {
    id: "head-of-official-division",
    title: "Banyubramanta Robotics Team",
    role: "Head of Official Division",
    period: "2023 — 2024",
    summary: "Managed operational workflows, administrative tasks, and external relations for the underwater robotics club.",
    bullets: [
      "Streamlined inventory management databases, tracking high-value sensor and thruster assets",
      "Coordinated logistic pathways for regional and national autonomous vehicle competitions",
      "Facilitated technical workshops for junior software and hardware subsystem members"
    ],
    featured: true
  },
  {
    id: "staff-of-cadre-development",
    title: "HIMATEKKOM",
    role: "Staff of Cadre Development",
    period: "2023 — 2024",
    summary: "Assisted in managing recruitment cycles, monitoring student performance indices, and staging workshops.",
    bullets: [
      "Coordinated evaluation surveys for 200+ students, analyzing feedback metrics via sheets scripts",
      "Managed event log sheets for departmental leadership training cohorts",
      "Delivered support material for student training projects and task group discussions"
    ],
    featured: false
  },
  {
    id: "software-subsystem-member",
    title: "Banyubramanta Robotics Team",
    role: "Software Subsystem Member",
    period: "2022 — 2023",
    summary: "Wrote sensor parsing code and flight stabilization logic for autonomous underwater testbeds.",
    bullets: [
      "Interfaced optical flow sensors and depth gauges with microcontroller control loops",
      "Analyzed serial telemetry signals using command line packet sniffers",
      "Implemented hardware backup triggers to return vehicles safely to surfaces"
    ],
    featured: false
  }
]

export const committees: CareerItem[] = [
  {
    id: "mage-x",
    title: "MAGE X Organizer",
    role: "Committee Member",
    period: "2024",
    summary: "Coordinated the Multimedia and Game Event (MAGE) national technical exhibition and competition.",
    bullets: [
      "Managed regional participant tracking databases, streamlining event registry files",
      "Assisted in configuring networking setups and device hardware for gaming tournaments",
      "Provided on-site support for technical panels and showcase exhibitions"
    ],
    featured: true
  },
  {
    id: "hgts",
    title: "HGTS Committee",
    role: "Technical Coordinator",
    period: "2023",
    summary: "Organized public hardware showcases and technical panels highlighting student IoT configurations.",
    bullets: [
      "Managed local local networking setups for project demonstration displays",
      "Configured registration check-in platforms, cutting down registration queues",
      "Coordinated logistic pathways for university event presenters"
    ],
    featured: true
  },
  {
    id: "inclenation",
    title: "Inclenation Committee",
    role: "Systems Specialist",
    period: "2023",
    summary: "Maintained event website assets, registration dashboards, and public telemetry views.",
    bullets: [
      "Monitored server traffic metrics, maintaining zero page downtime during registry peaks",
      "Integrated database triggers updating applicant logs automatically",
      "Wrote responsive CSS stylesheet guidelines for regional applicant portals"
    ],
    featured: true
  },
  {
    id: "sps",
    title: "SPS Committee",
    role: "Logistics Staff",
    period: "2022",
    summary: "Supported technical seminar hardware preparations and classroom setup configurations.",
    bullets: [
      "Assembled projector systems and audio feeds for seminar halls",
      "Maintained equipment inventory files, verifying high-value component tracking",
      "Assisted in coordinating participant traffic grids during peak hours"
    ],
    featured: false
  },
  {
    id: "isc",
    title: "ISC Committee",
    role: "Event Coordinator",
    period: "2022",
    summary: "Facilitated local science and engineering challenge logistics for middle-school contestants.",
    bullets: [
      "Organized student lab test parameters and safety checklists",
      "Managed scoring worksheets compiling judges assessments",
      "Coordinated contestant schedule timings across multiple test labs"
    ],
    featured: false
  }
]

export const training: CareerItem[] = [
  {
    id: "lkmm-tm",
    title: "LKMM TM",
    role: "Middle-Level Management Training",
    period: "2024",
    summary: "Completed strategic policy-making, organization auditing, and team resource training.",
    bullets: [
      "Drafted mock organizational bylaws evaluating structural policy changes",
      "Analyzed resource optimization models for medium-scale student bodies",
      "Studied resolution strategies for conflict management scenarios"
    ],
    featured: true
  },
  {
    id: "lkmm-td",
    title: "LKMM TD",
    role: "Basic Leadership Training",
    period: "2023",
    summary: "Acquired fundamental skills in project administration, team cohesion, and event operations.",
    bullets: [
      "Drafted project proposal outlines covering budget allocations and timelines",
      "Led group workshop projects discussing team alignment methodologies",
      "Completed certified assignments in event risk mitigation"
    ],
    featured: true
  },
  {
    id: "pkti",
    title: "PKTI",
    role: "Scientific Writing Workshop",
    period: "2023",
    summary: "Trained in analytical research writing, citation structures, and literature reviews.",
    bullets: [
      "Formulated research proposal reports evaluating IoT solutions",
      "Conformed citations to IEEE requirements using management utilities",
      "Learned hypothesis testing and statistical evaluation methodologies"
    ],
    featured: true
  },
  {
    id: "lkmw",
    title: "LKMW",
    role: "Leadership Workshop",
    period: "2022",
    summary: "Studied public speaking, team alignment dynamics, and basic administrative systems.",
    bullets: [
      "Practiced speech communication patterns for diverse audiences",
      "Participated in structural simulations checking organizational hierarchies",
      "Wrote session minutes tracking group decision variables"
    ],
    featured: false
  },
  {
    id: "mage-workshop",
    title: "MAGE Technical Workshop",
    role: "Attendee",
    period: "2022",
    summary: "Learned basic database architectures and API structure fundamentals from industry developers.",
    bullets: [
      "Developed basic database tables using standard SQL commands",
      "Connected local backend applications to simple database instances",
      "Completed introductory exercises using Postman testing environments"
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
    title: "Singapore AUV Challenge (SAUVC 2025)",
    competition: "5th Place globally",
    period: "2025",
    summary: "Co-developed the autonomous navigation logic for target localization and pipeline tracking.",
    bullets: [
      "Validated deep-water computer vision inference scripts under varying light conditions",
      "Designed robust telemetry communication configurations over serial and acoustic links"
    ]
  },
  {
    title: "Indonesian Robotics Contest (KRI National)",
    competition: "1st Place Nationally",
    period: "2024",
    summary: "Integrated Real-Time YOLO detection networks onto edge compute modules.",
    bullets: [
      "Wrote real-time hardware fail-safe routines, protecting the airframe under signal drops",
      "Secured first place out of 40+ competing university teams in speed and accuracy"
    ]
  },
  {
    title: "Indonesian Robotics Contest (KRI Regional)",
    competition: "3rd Place Regionally",
    period: "2024",
    summary: "Programmed search-grid waypoint loops for autonomous flight trajectories.",
    bullets: [
      "Implemented sensor fusion filters combining optical flow with laser altimeters",
      "Configured secure telemetry communication channels to ground control centers"
    ]
  }
]
