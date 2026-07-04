"use client"

import React from "react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface ActivityItem {
  title: string
  role?: string
  period: string
  summary: string
  bullets?: string[]
}

interface CategoryGroup {
  category: string
  items: ActivityItem[]
}

const leadershipData: CategoryGroup[] = [
  {
    category: "Teaching",
    items: [
      {
        title: "Introduction to Programming",
        role: "Teaching Assistant",
        period: "Aug 2024 — Dec 2025",
        summary: "Delivered programming lab content, guided hands-on C++ code exercises, and ran performance audits on automated grading script utilities.",
        bullets: [
          "Instructed 80+ undergraduate engineering students in syntax structures, pointer allocations, and standard templates",
          "Automated grading pipelines, reducing manual grading turnaround time from days to minutes",
          "Held weekly code review feedback cycles for homework sets and final algorithm projects"
        ]
      },
      {
        title: "DSP Laboratory",
        role: "Teaching Assistant",
        period: "Aug 2024 — Jan 2025",
        summary: "Coordinated digital signal processing experiments, optical flow sensors, and FFT analyzer operations.",
        bullets: [
          "Assisted students with Python signal noise filtering, data normalization scripts, and spectrogram plots",
          "Maintained hardware test rigs (microcontrollers, sound transducers) for laboratory exercises",
          "Conducted testing verification on edge computational accelerators (Jetson Nano, Raspberry Pi)"
        ]
      },
      {
        title: "Robotics Instructor",
        role: "Technical Mentor",
        period: "2024 — Present",
        summary: "Instructed high-school and university robotics cadets on electronic designs, flight controllers, and embedded firmware.",
        bullets: [
          "Formulated curricula covering basic PCB design routing, sensor bus wiring, and I2C/SPI protocols",
          "Supervised flight security simulations and drone hardware assembly diagnostics",
          "Mentored prospective competition teams on embedded C++ programming structures and git versioning"
        ]
      }
    ]
  },
  {
    category: "Organizations",
    items: [
      {
        title: "M-IOT Laboratory",
        role: "Systems & IoT Coordinator",
        period: "Sep 2024 — Present",
        summary: "Supervised telemetry deployments, server virtualization systems, and internal member development.",
        bullets: [
          "Administered dockerized Linux host machines, maintaining 99.9% uptime for local database stores",
          "Standardized network topology guides, API gateways, and MQTT publisher architectures for research labs",
          "Mentored junior lab engineers on server environments and microservice structures"
        ]
      },
      {
        title: "HIMATEKKOM",
        role: "Head of Cadre Development",
        period: "2024 — 2025",
        summary: "Directed talent pipelines, leadership training paths, and professional development programs within the department.",
        bullets: [
          "Designed comprehensive recruitment frameworks and personal performance criteria for 100+ members",
          "Facilitated engineering student forums focusing on leadership, technical management, and team collaboration",
          "Supervised inter-division task forces for department training events and structural audits"
        ]
      },
      {
        title: "Banyubramanta Robotics Team",
        role: "Head of Official Division",
        period: "2023 — 2024",
        summary: "Managed operational workflows, administrative tasks, and external relations for the underwater robotics club.",
        bullets: [
          "Streamlined inventory management databases, tracking high-value sensor and thruster assets",
          "Coordinated logistic pathways for regional and national autonomous vehicle competitions",
          "Facilitated technical workshops for junior software and hardware subsystem members"
        ]
      }
    ]
  },
  {
    category: "Awards",
    items: [
      {
        title: "SAUVC 2025",
        role: "Singapore AUV Challenge",
        period: "2025",
        summary: "Achieved 5th Place in the international autonomous underwater vehicle engineering tournament.",
        bullets: [
          "Co-developed the autonomous navigation logic for target localization and pipeline tracking",
          "Validated deep-water computer vision inference scripts under varying light conditions",
          "Designed robust telemetry communication configurations over serial and acoustic links"
        ]
      },
      {
        title: "KRI Regional",
        role: "Indonesian Robotics Contest",
        period: "2024",
        summary: "Secured 3rd Place in the regional classification rounds for autonomous drone divisions.",
        bullets: [
          "Programmed search-grid waypoint loops for autonomous flight trajectories",
          "Implemented sensor fusion filters combining optical flow with laser altimeters",
          "Configured secure telemetry communication channels to ground control centers"
        ]
      },
      {
        title: "KRI National",
        role: "Indonesian Robotics Contest",
        period: "2024",
        summary: "Placed 1st Nationally in the prestigious annual engineering competition.",
        bullets: [
          "Integrated Real-Time YOLO detection networks onto edge compute modules",
          "Wrote real-time hardware fail-safe routines, protecting the airframe under signal drops",
          "Secured first place out of 40+ competing university teams in speed and accuracy"
        ]
      }
    ]
  },
  {
    category: "Training & Committees",
    items: [
      {
        title: "Engineering Leadership Training",
        role: "LKMM TM / TD / PKTI / LKMW",
        period: "2022 — 2024",
        summary: "Completed certified leadership development, scientific research writing, and technical student training pathways.",
        bullets: [
          "LKMM TM: Trained in middle-level organization management and strategic policy building",
          "LKMM TD: Developed foundation skills in team cooperation, event planning, and administration",
          "PKTI & LKMW: Specialized in scientific analysis frameworks, writing methodologies, and project planning"
        ]
      },
      {
        title: "MAGE X Organizer",
        role: "Committee Member",
        period: "2024",
        summary: "Coordinated the Multimedia and Game Event (MAGE) national technical exhibition and competition.",
        bullets: [
          "Managed regional participant tracking databases, streamlining event registry files",
          "Assisted in configuring networking setups and device hardware for gaming tournaments",
          "Provided on-site support for technical panels and showcase exhibitions"
        ]
      },
      {
        title: "Engineering Committees",
        role: "HGTS / Inclenation / SPS / ISC",
        period: "2022 — 2025",
        summary: "Contributed to multiple department events, technical seminars, and student community organizations.",
        bullets: [
          "Organized academic panels, local hardware exhibitions, and industry networking events",
          "Configured event registration platforms and managed participant analytics dashboard databases",
          "Facilitated hardware deployment logistics for project demonstration displays"
        ]
      }
    ]
  }
]

export default function LeadershipActivities() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section
      id="leadership-activities"
      aria-labelledby="leadership-heading"
      className="w-full py-20 bg-muted/10 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 text-left max-w-3xl">
          <Badge 
            variant="outline" 
            className="w-fit border-border py-1.5 px-3 bg-muted/30 text-muted-foreground font-mono font-medium text-sm uppercase tracking-wider select-none"
          >
            Soft Skills & Involvement
          </Badge>
          <h2 
            id="leadership-heading"
            className="text-3xl font-sans font-bold tracking-tight text-foreground md:text-4xl"
          >
            Leadership & Activities
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-sans leading-relaxed md:leading-8">
            Teaching, leadership, awards, organizations, training and community involvement.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {leadershipData.map((group) => (
            <motion.div 
              key={group.category} 
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-wider border-b border-border/60 pb-2 text-left">
                {group.category}
              </h3>

              <div className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <Card 
                    key={item.title} 
                    className="border border-border bg-card/25 shadow-sm p-4 flex flex-col gap-2 hover:border-primary/30 transition-colors duration-150 text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-sans text-base font-bold text-foreground leading-tight">
                          {item.title}
                        </h4>
                        {item.role && (
                          <span className="font-mono text-sm text-muted-foreground mt-0.5 block">
                            {item.role}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-sm text-zinc-500 shrink-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-1">
                      {item.summary}
                    </p>

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc pl-4 text-sm text-muted-foreground flex flex-col gap-1 mt-1.5 leading-relaxed">
                        {item.bullets.slice(0, 3).map((bullet, i) => (
                          <li key={i}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
