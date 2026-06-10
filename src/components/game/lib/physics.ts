import { platforms } from "../config/platforms";
import { PHYSICS, PLAYER_SIZE, WORLD } from "../config/world";
import type { Camera, ControlsState, Player } from "../types";

type StepArgs = {
  player: Player;
  controls: ControlsState;
  dt: number;
  now: number;
  jumpQueuedAt: number;
  lastGroundedAt: number;
  safeSpawn: { x: number; y: number };
};

type StepResult = {
  player: Player;
  safeSpawn: { x: number; y: number };
  lastGroundedAt: number;
  consumedJump: boolean;
};

export function stepPlayer({
  player,
  controls,
  dt,
  now,
  jumpQueuedAt,
  lastGroundedAt,
  safeSpawn,
}: StepArgs): StepResult {
  const previous = { ...player };
  const next: Player = { ...player };
  const accel = next.grounded ? PHYSICS.acceleration : PHYSICS.airAcceleration;

  if (controls.left) {
    next.vx -= accel * dt;
    next.facing = -1;
  }

  if (controls.right) {
    next.vx += accel * dt;
    next.facing = 1;
  }

  if (!controls.left && !controls.right) {
    next.vx *= Math.pow(PHYSICS.friction, dt);
  }

  next.vx = clamp(next.vx, -PHYSICS.maxRunSpeed, PHYSICS.maxRunSpeed);

  const jumpBuffered = now - jumpQueuedAt <= PHYSICS.jumpBufferMs;
  const canCoyoteJump = next.grounded || now - lastGroundedAt <= PHYSICS.coyoteMs;
  let consumedJump = false;

  if (jumpBuffered && canCoyoteJump) {
    next.vy = PHYSICS.jumpImpulse;
    next.grounded = false;
    consumedJump = true;
  }

  next.vy += PHYSICS.gravity * dt;
  next.vy = Math.min(next.vy, PHYSICS.maxFallSpeed);
  next.x += next.vx * dt;
  next.y += next.vy * dt;
  next.x = clamp(next.x, 24, WORLD.width - PLAYER_SIZE.width - 24);
  next.grounded = false;

  let nextSafeSpawn = safeSpawn;
  let nextLastGroundedAt = lastGroundedAt;

  for (const platform of platforms) {
    const previousBottom = previous.y + PLAYER_SIZE.height;
    const nextBottom = next.y + PLAYER_SIZE.height;
    const overlapsX =
      next.x + PLAYER_SIZE.width > platform.x &&
      next.x < platform.x + platform.width;
    const crossedTop = previousBottom <= platform.y + 5 && nextBottom >= platform.y;

    if (overlapsX && crossedTop && next.vy >= 0) {
      const wasAirborne = !previous.grounded;
      next.y = platform.y - PLAYER_SIZE.height;
      next.vy = 0;
      next.grounded = true;
      nextLastGroundedAt = now;
      nextSafeSpawn = { x: next.x, y: next.y };
      if (wasAirborne) {
        next.landedAt = now;
      }
      break;
    }
  }

  if (next.y > WORLD.height + 220) {
    next.x = nextSafeSpawn.x;
    next.y = nextSafeSpawn.y;
    next.vx = 0;
    next.vy = 0;
    next.grounded = true;
    nextLastGroundedAt = now;
    next.landedAt = now;
  }

  next.state = getPlayerState(next, now);

  return {
    player: next,
    safeSpawn: nextSafeSpawn,
    lastGroundedAt: nextLastGroundedAt,
    consumedJump,
  };
}

export function nextCamera(player: Player, camera: Camera, viewport: { width: number; height: number }) {
  const target = {
    x: clamp(player.x - viewport.width * 0.42, 0, Math.max(0, WORLD.width - viewport.width)),
    y: clamp(player.y - viewport.height * 0.36, 0, Math.max(0, WORLD.height - viewport.height)),
  };

  return {
    x: camera.x + (target.x - camera.x) * PHYSICS.cameraLerp,
    y: camera.y + (target.y - camera.y) * PHYSICS.cameraLerp,
  };
}

function getPlayerState(player: Player, now: number) {
  if (now - player.landedAt < 130 && player.grounded && Math.abs(player.vx) < 1.5) {
    return "land";
  }

  if (!player.grounded) {
    return player.vy < 0 ? "jump" : "fall";
  }

  const speed = Math.abs(player.vx);
  if (speed > PHYSICS.maxWalkSpeed * 0.72) {
    return "run";
  }

  if (speed > 0.55) {
    return "walk";
  }

  return "idle";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
