export type ZoneId =
  | "spawn"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "contact";

export type PlatformKind = "main" | "step" | "thin" | "bridge";

export type Rect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind?: PlatformKind;
  zoneId: ZoneId;
};

export type Zone = {
  id: ZoneId;
  label: string;
  subtitle: string;
  y: number;
  height: number;
  accent: string;
};

export type GameObjectKind =
  | "sign"
  | "skills"
  | "project"
  | "timeline"
  | "contact"
  | "trophy";

export type GameObjectConfig = {
  id: string;
  zoneId: ZoneId;
  kind: GameObjectKind;
  x: number;
  y: number;
  width: number;
  radius: number;
  projectIndex?: number;
};

export type Collectible = {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
};

export type DecorativeElement = {
  id: string;
  zoneId: ZoneId;
  kind: "star" | "beacon" | "shard" | "crystal" | "terminal" | "portal" | "satellite";
  x: number;
  y: number;
  size: number;
};

export type PlayerState = "idle" | "walk" | "run" | "jump" | "fall" | "land";

export type Player = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  grounded: boolean;
  facing: 1 | -1;
  state: PlayerState;
  landedAt: number;
};

export type Camera = {
  x: number;
  y: number;
};

export type GameProgress = {
  currentSection: ZoneId;
  discovered: ZoneId[];
  collected: string[];
  completion: number;
};

export type ControlsState = {
  left: boolean;
  right: boolean;
  jump: boolean;
};
