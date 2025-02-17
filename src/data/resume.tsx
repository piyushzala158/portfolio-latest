import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Piyush Zala",
  initials: "PZ",
  url: "https://dillion.io",
  location: "Gujarat, india",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "A passionate Front-End Developer with 2+ years of industry experience.",
  summary:
    "Enthusiastic Front-End Developer with 2+ years of experience building user-friendly and responsive web applications. Adept at utilizing a diverse tech stack including Next.js, React.js, MUI, Firebase, WebSockets, Auth0, Tailwind CSS, SCSS, Prisma, and React Native. Skilled in state management libraries such as Redux and Recoil, form handling with Formik, and animation libraries like Framer Motion. Strong communicator with proven ability to collaborate effectively with cross-functional teams and engage with clients to gather requirements, provide updates, and deliver high-quality solutions. Passionate about creating intuitive and visually appealing UIs while staying up-to-date with the latest front-end trends.",
  avatarUrl: "/piyush.jpeg",
  skills: ["React", "Next.js", "Typescript", "Material UI"],
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
      company: "Atomic Finance",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Bitcoin Protocol Engineer",
      logoUrl: "/atomic.png",
      start: "May 2021",
      end: "Oct 2022",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },
    {
      company: "Shopify",
      badges: [],
      href: "https://shopify.com",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/shopify.svg",
      start: "January 2021",
      end: "April 2021",
      description:
        "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.",
    },
  ],
  education: [
    {
      school: "Buildspace",
      href: "https://buildspace.so",
      degree: "s3, s4, sf1, s5",
      logoUrl: "/buildspace.jpg",
      start: "2023",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Meetting Summarizer",
      href: "https://yourmeetingbuddy.vercel.app/login",
      dates: "Jan 2025 - Feb 2025",
      active: true,
      description:
        "I built this web app using Next.js (App Router), NextAuth, Supabase, ShadCN, Tailwind CSS, and a gamini API. Users can sign up with Google, record meetings without joining as bots, and receive AI-generated summaries. They can also access a history of all their meeting summaries for easy reference.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "NextAuth",
        "TailwindCSS",
        "Supabase",
        "Shadcn UI",
        "gamini",
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
  ],
  hackathons: [],
} as const;
