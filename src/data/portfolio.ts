import { PortfolioData } from "@/types/portfolio";

export const DATA: PortfolioData = {
  name: "Piyush Zala",
  firstName: "Piyush",
  lastName: "Zala",
  initials: "PZ",
  url: "https://portfolio-latest-taupe.vercel.app",
  location: "Ahmedabad, Gujarat, India",
  email: "dev.piyushzala@gmail.com",
  description: "Frontend Software Engineer — React · Next.js · TypeScript",
  summary:
    "I'm a passionate Frontend Software Engineer with 3+ years of experience building modern, scalable web applications. I specialize in React.js, Next.js, and TypeScript — crafting everything from AI-powered platforms and real-time collaborative tools to enterprise dashboards. I love turning complex problems into elegant, performant interfaces.",
  avatarUrl: "/piyush.jpeg",
  social: [
    {
      name: "GitHub",
      url: "https://github.com/piyushzala158",
      icon: "Github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/piyushzala/",
      icon: "Linkedin",
    },
    {
      name: "X",
      url: "https://x.com/zala_piyush_15",
      icon: "Twitter",
    },
  ],
  navbar: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#work" },
    { label: "Education", href: "#education" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  skills: [
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "HTML5", category: "Frontend" },
    { name: "CSS3", category: "Frontend" },
    { name: "Framer Motion", category: "Frontend" },
    { name: "Redux", category: "State Management" },
    { name: "Recoil", category: "State Management" },
    { name: "Context API", category: "State Management" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "ShadCN", category: "Styling" },
    { name: "Material UI", category: "Styling" },
    { name: "SCSS", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "Prisma", category: "Backend" },
    { name: "Firebase", category: "Backend" },
    { name: "WebSockets", category: "Backend" },
    { name: "SSE", category: "Backend" },
    { name: "Auth0", category: "Auth & Security" },
    { name: "JWT", category: "Auth & Security" },
    { name: "Git", category: "Tools & Platforms" },
    { name: "GitHub", category: "Tools & Platforms" },
    { name: "Vercel", category: "Tools & Platforms" },
    { name: "MCP", category: "Tools & Platforms" },
  ],
  experience: [
    {
      company: "Elixir Techne",
      role: "Frontend Software Engineer",
      period: "Apr 2025 — Present",
      description: [
        "Built an AI playground enabling multi-model interaction (ChatGPT, Gemini, Claude) with streaming responses via SSE",
        "Developed an agent management system supporting MCP server connectivity with real-time tool execution",
        "Architected BizzMitr — a full-scale inventory & catalog management platform with role-based access control",
        "Implemented complex data tables with filtering, sorting, and pagination for enterprise-grade dashboards",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "SSE",
        "MCP",
        "Tailwind CSS",
        "ShadCN",
      ],
    },
    {
      company: "Zignuts Technolab",
      role: "Junior Web Developer",
      period: "Jan 2023 — Mar 2025",
      description: [
        "Built BookSphere — a social book discovery platform with community features, reading lists, and personalized recommendations",
        "Developed LeadConnect — a WhatsApp-based business communication platform with real-time messaging via WebSockets",
        "Implemented responsive UIs using React.js and Material UI, achieving 99% cross-browser compatibility",
        "Collaborated with cross-functional teams following Agile methodologies to deliver projects on schedule",
      ],
      technologies: [
        "React.js",
        "Redux",
        "Material UI",
        "WebSockets",
        "REST APIs",
      ],
    },
    {
      company: "Zignuts Technolab",
      role: "Trainee Web Developer",
      period: "Aug 2022 — Jan 2023",
      description: [
        "Completed intensive training in React.js ecosystem including hooks, context API, and state management",
        "Built multiple internal tools and prototypes during the training period",
        "Gained hands-on experience with modern JavaScript, TypeScript, and frontend build tools",
      ],
      technologies: ["React.js", "JavaScript", "TypeScript", "CSS"],
    },
    {
      company: "BrainyBeam Technologies",
      role: "Django Developer Intern",
      period: "Jun 2022 — Jul 2022",
      description: [
        "Developed web applications using Django framework with Python",
        "Gained experience in full-stack development, database design, and REST API creation",
      ],
      technologies: ["Python", "Django", "PostgreSQL"],
    },
  ],
  education: [
    {
      institution: "Government Engineering College, Modasa",
      degree: "Bachelor of Engineering — Information Technology",
      period: "2019 — 2023",
      description:
        "Studied core computer science fundamentals including data structures, algorithms, database systems, and software engineering.",
    },
  ],
  projects: [
    {
      title: "AIFoundry",
      description:
        "A comprehensive AI Agent Platform enabling users to interact with multiple AI models (ChatGPT, Gemini, Claude) through a unified playground. Features agent creation, management, and MCP server integration for real-time tool execution.",
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "SSE",
        "Tailwind CSS",
        "ShadCN",
      ],
    },
    {
      title: "BizzMitr",
      description:
        "Full-scale inventory & catalog management platform with role-based access control, real-time analytics dashboards, and enterprise-grade data tables with advanced filtering and sorting capabilities.",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      title: "Meeting Summarizer",
      description:
        "AI-powered meeting summary tool that automatically generates concise summaries from meeting recordings. Features user authentication, meeting history, and integration with Google's Gemini AI for intelligent summarization.",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "NextAuth",
        "Supabase",
        "ShadCN",
        "Gemini AI",
      ],
      href: "https://meetbuddy.vercel.app",
      image: "/meetbuddy.png",
    },
    {
      title: "BookSphere",
      description:
        "A social book discovery platform where readers can explore, review, and share books. Features community-driven reading lists, personalized recommendations, and social interactions between book enthusiasts.",
      technologies: ["React.js", "Redux", "Material UI", "REST APIs"],
    },
    {
      title: "LeadConnect",
      description:
        "WhatsApp-based business communication platform enabling companies to manage customer interactions at scale. Features real-time messaging via WebSockets, contact management, and automated response workflows.",
      technologies: [
        "React.js",
        "WebSockets",
        "REST APIs",
        "Material UI",
      ],
    },
    {
      title: "callsumurizer.ai",
      description:
        "Call data analytics platform that transforms raw call recordings into actionable insights. Features AI-powered transcription, sentiment analysis, and visual dashboards for tracking communication patterns.",
      technologies: [
        "Next.js",
        "React.js",
        "Material UI",
        "Firebase",
      ],
    },
  ],
};
