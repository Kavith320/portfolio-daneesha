// ── Portfolio TypeScript Interfaces ──────────────────────────────────────────
// These are the serializable (JSON-safe) types used throughout the app.
// Icons are resolved separately via lib/skillIcons.ts

export interface DeveloperInfo {
  name: string;
  title: string;
  specialty: string;
  subTitle: string;
  bio: string;
  goals: string;
  studies: string;
  resumeUrl: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  avatarUrl: string;
  heroVideoUrl?: string;
}

export interface SkillItem {
  name: string;
  level: "Advanced" | "Intermediate" | "Beginner";
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  tags: string[];
  features: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  details: string;
  coursework: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  link: string;
  image: string;
}

export interface PortfolioData {
  developerInfo: DeveloperInfo;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: Certificate[];
}
