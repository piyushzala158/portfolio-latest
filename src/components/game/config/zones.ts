import type { Collectible, DecorativeElement, GameObjectConfig, Zone } from "../types";

export const zones: Zone[] = [
  {
    id: "spawn",
    label: "Spawn",
    subtitle: "Portfolio launch pad",
    y: 90,
    height: 650,
    accent: "var(--game-blue)",
  },
  {
    id: "about",
    label: "About",
    subtitle: "Floating introduction station",
    y: 780,
    height: 700,
    accent: "var(--game-cyan)",
  },
  {
    id: "skills",
    label: "Skills",
    subtitle: "Technology crystal cavern",
    y: 1510,
    height: 830,
    accent: "var(--game-green)",
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "Project platform network",
    y: 2400,
    height: 1120,
    accent: "var(--game-purple)",
  },
  {
    id: "experience",
    label: "Experience",
    subtitle: "Timeline tower",
    y: 3600,
    height: 740,
    accent: "var(--game-amber)",
  },
  {
    id: "achievements",
    label: "Achievements",
    subtitle: "Milestone vault",
    y: 4360,
    height: 560,
    accent: "var(--game-rose)",
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "Final signal gate",
    y: 5000,
    height: 520,
    accent: "var(--game-blue)",
  },
];

export const gameObjects: GameObjectConfig[] = [
  { id: "spawn-panel", zoneId: "spawn", kind: "sign", x: 96, y: 112, width: 480, radius: 260 },
  { id: "about-sign", zoneId: "about", kind: "sign", x: 205, y: 688, width: 510, radius: 275 },
  { id: "skills-grid", zoneId: "skills", kind: "skills", x: 146, y: 1310, width: 880, radius: 335 },
  { id: "projects-heading", zoneId: "projects", kind: "sign", x: 94, y: 2220, width: 430, radius: 240 },
  { id: "project-0", zoneId: "projects", kind: "project", x: 155, y: 2488, width: 370, radius: 245, projectIndex: 0 },
  { id: "project-1", zoneId: "projects", kind: "project", x: 695, y: 2638, width: 370, radius: 245, projectIndex: 1 },
  { id: "project-2", zoneId: "projects", kind: "project", x: 245, y: 2935, width: 370, radius: 245, projectIndex: 2 },
  { id: "project-3", zoneId: "projects", kind: "project", x: 720, y: 3095, width: 370, radius: 245, projectIndex: 3 },
  { id: "project-4", zoneId: "projects", kind: "project", x: 190, y: 3308, width: 370, radius: 245, projectIndex: 4 },
  { id: "project-5", zoneId: "projects", kind: "project", x: 720, y: 3438, width: 370, radius: 245, projectIndex: 5 },
  { id: "experience-panel", zoneId: "experience", kind: "timeline", x: 285, y: 3495, width: 650, radius: 320 },
  { id: "achievements-heading", zoneId: "achievements", kind: "sign", x: 220, y: 4210, width: 560, radius: 260 },
  { id: "contact-gate", zoneId: "contact", kind: "contact", x: 320, y: 4895, width: 620, radius: 330 },
];

export const collectibles: Collectible[] = [
  {
    id: "ai-platforms",
    label: "AI Platform Builder",
    description: "Built multi-model AI and agent workflows.",
    x: 290,
    y: 4476,
  },
  {
    id: "realtime",
    label: "Realtime Systems",
    description: "Delivered SSE and WebSocket product experiences.",
    x: 540,
    y: 4424,
  },
  {
    id: "enterprise",
    label: "Enterprise Dashboards",
    description: "Designed data-heavy operational interfaces.",
    x: 805,
    y: 4484,
  },
];

export const decorativeElements: DecorativeElement[] = [
  { id: "spawn-beacon", zoneId: "spawn", kind: "beacon", x: 620, y: 190, size: 80 },
  { id: "spawn-satellite", zoneId: "spawn", kind: "satellite", x: 980, y: 395, size: 54 },
  { id: "about-star-a", zoneId: "about", kind: "star", x: 955, y: 812, size: 28 },
  { id: "about-shard", zoneId: "about", kind: "shard", x: 118, y: 1030, size: 48 },
  { id: "skills-crystal-a", zoneId: "skills", kind: "crystal", x: 1080, y: 1535, size: 64 },
  { id: "skills-crystal-b", zoneId: "skills", kind: "crystal", x: 74, y: 1830, size: 46 },
  { id: "project-portal", zoneId: "projects", kind: "portal", x: 1120, y: 2510, size: 92 },
  { id: "project-shard", zoneId: "projects", kind: "shard", x: 76, y: 3140, size: 42 },
  { id: "experience-terminal", zoneId: "experience", kind: "terminal", x: 1028, y: 3790, size: 76 },
  { id: "achievement-beacon", zoneId: "achievements", kind: "beacon", x: 1060, y: 4430, size: 70 },
  { id: "contact-portal", zoneId: "contact", kind: "portal", x: 1062, y: 5042, size: 94 },
];
