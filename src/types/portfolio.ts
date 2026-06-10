export interface SocialLink {
  name: string;
  url: string;
  icon: string; // lucide icon name
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "State Management"
  | "Styling"
  | "Auth & Security"
  | "Tools & Platforms";

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  github?: string;
  image?: string;
}

export interface PortfolioData {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  url: string;
  location: string;
  email: string;
  description: string;
  summary: string;
  avatarUrl: string;
  social: SocialLink[];
  navbar: NavItem[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}
