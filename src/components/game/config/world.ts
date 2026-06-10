import type { Camera, GameProgress, Player } from "../types";

export const WORLD = {
  width: 1280,
  height: 5520,
  spawnX: 138,
  spawnY: 292,
  debugPlatforms: false,
} as const;

export const PLAYER_SIZE = {
  width: 46,
  height: 64,
} as const;

export const PHYSICS = {
  gravity: 0.66,
  acceleration: 0.78,
  airAcceleration: 0.48,
  friction: 0.84,
  maxWalkSpeed: 5.25,
  maxRunSpeed: 8.25,
  jumpImpulse: -16.4,
  maxFallSpeed: 18,
  jumpBufferMs: 120,
  coyoteMs: 90,
  cameraLerp: 0.085,
} as const;

export const PROGRESS_KEY = "portfolio-game-progress-v1";

export const initialProgress: GameProgress = {
  currentSection: "spawn",
  discovered: ["spawn"],
  collected: [],
  completion: 0,
};

export const initialPlayer: Player = {
  x: WORLD.spawnX,
  y: WORLD.spawnY,
  vx: 0,
  vy: 0,
  grounded: false,
  facing: 1,
  state: "fall",
  landedAt: 0,
};

export const initialCamera: Camera = {
  x: 0,
  y: 0,
};

export const initialViewport = {
  width: 1024,
  height: 720,
};
