import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Piyush Zala",
  initials: "PZ",
  url: "https://piyushzala.vercel.app",
  location: "Gujarat, India",
  locationLink: "https://www.google.com/maps/place/Gujarat",
  description:
    "Next.js | React.js | Software Engineer at Elixir Techne",
  summary:
    "Enthusiastic Front-End Developer with 2.5+ years of experience building user-friendly and responsive web applications. Adept at utilizing a diverse tech stack including Next.js, React.js, MUI, Firebase, WebSockets, Auth0, Tailwind CSS, SCSS, Prisma, and React Native. Skilled in state management libraries such as Redux and Recoil, form handling with Formik, and animation libraries like Framer Motion. Strong communicator with proven ability to collaborate effectively with cross-functional teams and engage with clients to gather requirements, provide updates, and deliver high-quality solutions. Passionate about creating intuitive and visually appealing UIs while staying up-to-date with the latest front-end trends.",
  avatarUrl: "/piyush.jpeg",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Material UI",
    "Tailwind CSS",
    "Firebase",
    "WebSockets",
    "Auth0",
    "SCSS",
    "Prisma",
    "React Native",
    "Redux",
    "Recoil",
    "Formik",
    "Framer Motion",
    "Node.js",
    "HTML5",
    "CSS3",
    "Vite",
    "Google Cloud Platform (GCP)",
    "SignalR",
    "Stripe",
    "Google OAuth",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "dev.piyushzala@gmail.com",
    // tel: "+91",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/piyushzala158",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/piyushzala/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/zala_piyush_15",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Elixir Techne",
      href: "",
      badges: ["Full-time"],
      location: "Ahmedabad, Gujarat, India",
      title: "Software Engineer",
      logoUrl: "",
      start: "Apr 2025",
      end: "Present",
      description:
        "Working as a Software Engineer building and maintaining web applications using modern front-end technologies including Next.js and React.js.",
    },
    {
      company: "Zignuts Technolab",
      badges: ["Full-time"],
      href: "",
      location: "Gandhinagar, Gujarat, India",
      title: "Junior Web Developer",
      logoUrl: "",
      start: "Jan 2023",
      end: "Mar 2025",
      description:
        "Worked as a Junior Web Developer for 2 years and 3 months, building user-friendly and responsive web applications using Next.js, Material-UI, and other modern front-end technologies.",
    },
    {
      company: "Zignuts Technolab",
      badges: ["Internship"],
      href: "",
      location: "Gandhinagar, Gujarat, India",
      title: "Trainee Web Developer",
      logoUrl: "",
      start: "Aug 2022",
      end: "Jan 2023",
      description:
        "Started my professional journey as a Trainee Web Developer, learning and contributing to projects using Material-UI, Vite, and other front-end tools.",
    },
    {
      company: "BrainyBeam Technologies Pvt. Ltd.",
      badges: ["Internship"],
      href: "",
      location: "Ahmedabad, Gujarat, India",
      title: "Django Developer",
      logoUrl: "",
      start: "Jun 2022",
      end: "Jul 2022",
      description:
        "Completed a 2-month internship as a Django Developer, gaining hands-on experience with Python and Django web framework.",
    },
  ],
  education: [
    {
      company: "Government Engineering College, Modasa",
      href: "",
      title: "Bachelor of Engineering — B.E., Information Technology",
      location: "Modasa, Gujarat, India",
      logoUrl: "",
      start: "2019",
      end: "2023",
      description:
        "Completed Bachelor of Engineering in Information Technology from Government Engineering College, Modasa.",
    },
  ],
  projects: [
    {
      title: "Meeting Summarizer",
      href: "https://yourmeetingbuddy.vercel.app/login",
      dates: "Jan 2025 - Feb 2025",
      active: true,
      description:
        "I built this web app using Next.js (App Router), NextAuth, Supabase, ShadCN, Tailwind CSS, and a Gemini API. Users can sign up with Google, record meetings without joining as bots, and receive AI-generated summaries. They can also access a history of all their meeting summaries for easy reference.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "NextAuth",
        "TailwindCSS",
        "Supabase",
        "Shadcn UI",
        "Gemini",
      ],
      links: [
        {
          type: "Website",
          href: "https://yourmeetingbuddy.vercel.app/login",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/meetbuddy.png",
      video: "",
    },
    {
      title: "BookSphere",
      href: "",
      dates: "Aug 2024 - Present",
      active: true,
      description:
        "Developed key features for BookSphere, a social media app for readers and authors, including user signup, post creation, and book-reading functionalities. Enabled access to premium content through a credit-based system with Stripe integration. Implemented role-based authentication, media uploads, and server-side rendering using Next.js to optimize performance and SEO. Leveraged Next.js, Material UI, Google reCAPTCHA, and Google OAuth for a secure and engaging user experience.",
      technologies: [
        "Next.js",
        "Material UI",
        "Stripe",
        "Google OAuth",
        "Google reCAPTCHA",
        "Google Cloud Platform (GCP)",
        "Server-Side Rendering",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "LeadConnect",
      href: "",
      dates: "Oct 2023 - Jul 2024",
      active: false,
      description:
        "As a Frontend Developer for LeadConnect, I helped build a lead generation platform that integrates WhatsApp API and Facebook Ads. Users can log in to chat with leads, manage stages (e.g., chat, call, appointment), and access analytics with charts and date filters. The platform, which handles thousands of messages daily, was developed using Next.js, Material UI, and SignalR (WebSocket).",
      technologies: [
        "Next.js",
        "React.js",
        "Material UI",
        "SignalR",
        "WebSocket",
        "WhatsApp API",
        "Facebook Ads",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "callsumurizer.ai",
      href: "",
      dates: "May 2023 - Jun 2023",
      active: false,
      description:
        "As a front-end developer for callsumurizer.ai, I contributed to an innovative platform transforming call data analytics. From the ground up, I worked to design and implement a fully responsive user interface using Next.js and Material UI. My responsibilities included integrating Firebase for authentication, managing private and public routes, and incorporating an audio player for seamless call analysis.",
      technologies: [
        "Next.js",
        "React.js",
        "Material UI",
        "Firebase",
        "Authentication",
        "Audio Player",
      ],
      links: [],
      image: "",
      video: "",
    },
  ],
  hackathons: [],
} as const;
