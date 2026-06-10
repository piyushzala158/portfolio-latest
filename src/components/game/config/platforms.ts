import type { Rect } from "../types";

export const platforms: Rect[] = [
  { id: "spawn-main", zoneId: "spawn", x: 70, y: 382, width: 455, height: 30, kind: "main" },
  { id: "spawn-bridge", zoneId: "spawn", x: 570, y: 515, width: 210, height: 22, kind: "step" },
  { id: "about-step", zoneId: "about", x: 805, y: 666, width: 230, height: 22, kind: "step" },
  { id: "about-main", zoneId: "about", x: 180, y: 945, width: 690, height: 30, kind: "main" },
  { id: "about-drop", zoneId: "about", x: 910, y: 1125, width: 230, height: 22, kind: "thin" },
  { id: "skills-entry", zoneId: "skills", x: 590, y: 1318, width: 255, height: 22, kind: "step" },
  { id: "skills-main", zoneId: "skills", x: 130, y: 1660, width: 930, height: 32, kind: "main" },
  { id: "skills-exit", zoneId: "skills", x: 770, y: 1992, width: 275, height: 22, kind: "thin" },
  { id: "projects-entry", zoneId: "projects", x: 355, y: 2248, width: 240, height: 22, kind: "step" },
  { id: "projects-a", zoneId: "projects", x: 100, y: 2632, width: 465, height: 30, kind: "main" },
  { id: "projects-b", zoneId: "projects", x: 648, y: 2785, width: 500, height: 30, kind: "main" },
  { id: "projects-c", zoneId: "projects", x: 190, y: 3100, width: 475, height: 30, kind: "main" },
  { id: "projects-d", zoneId: "projects", x: 682, y: 3265, width: 460, height: 30, kind: "main" },
  { id: "projects-low", zoneId: "projects", x: 150, y: 3518, width: 360, height: 24, kind: "bridge" },
  { id: "experience-entry", zoneId: "experience", x: 485, y: 3576, width: 260, height: 22, kind: "step" },
  { id: "experience-main", zoneId: "experience", x: 238, y: 3795, width: 720, height: 32, kind: "main" },
  { id: "experience-exit", zoneId: "experience", x: 675, y: 4170, width: 300, height: 22, kind: "thin" },
  { id: "achievements-main", zoneId: "achievements", x: 170, y: 4568, width: 890, height: 32, kind: "main" },
  { id: "contact-entry", zoneId: "contact", x: 640, y: 4874, width: 280, height: 22, kind: "step" },
  { id: "contact-main", zoneId: "contact", x: 275, y: 5192, width: 760, height: 34, kind: "main" },
];

export const respawnAnchors = platforms
  .filter((platform) => platform.kind === "main")
  .map((platform) => ({
    id: `${platform.zoneId}-respawn`,
    zoneId: platform.zoneId,
    x: platform.x + 42,
    y: platform.y - 64,
  }));
