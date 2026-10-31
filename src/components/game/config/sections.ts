import type { ZoneId } from "../types";

export const GAME_SECTIONS = [
  { id: "hero", zoneId: "spawn", label: "Start" },
  { id: "about", zoneId: "about", label: "About" },
  { id: "skills", zoneId: "skills", label: "Skills" },
  { id: "work", zoneId: "experience", label: "Experience" },
  { id: "education", zoneId: "achievements", label: "Education" },
  { id: "projects", zoneId: "projects", label: "Projects" },
  { id: "contact", zoneId: "contact", label: "Contact" },
] as const satisfies ReadonlyArray<{
  id: string;
  zoneId: ZoneId;
  label: string;
}>;
