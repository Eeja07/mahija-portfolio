export interface EducationItem {
  id: string
  institution: string
  location: string
  degree: string
  period: string
  score: string
}

export const educationData: EducationItem[] = [
  {
    id: "its",
    institution: "Sepuluh Nopember Institute of Technology",
    location: "Surabaya",
    degree: "Bachelor of Computer Engineering",
    period: "July 2022 – August 2026",
    score: "GPA: 3.32/4.00",
  },
  {
    id: "sman4",
    institution: "SMAN 4 Jakarta",
    location: "Jakarta",
    degree: "Science Major",
    period: "July 2019 – May 2022",
    score: "Final Score: 86/100",
  },
]

export function getEducation(): EducationItem[] {
  return educationData
}
