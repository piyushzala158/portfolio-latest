import { PHYSICS, PLAYER_SIZE } from "../config/world";
import type { Camera, ControlsState, Player } from "../types";
import type { Rect } from "../types";

type StepArgs = {
  player: Player;
  controls: ControlsState;
  platforms: Rect[];
  world: { width: number; height: number; minX?: number };
  pointer: { x: number; y: number } | null;
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
  platforms,
  world,
  pointer,
  dt,
  now,
  jumpQueuedAt,
  lastGroundedAt,
  safeSpawn,
}: StepArgs): StepResult {
  const previous = { ...player };
  const next: Player = { ...player };
  const accel = next.grounded ? PHYSICS.acceleration : PHYSICS.airAcceleration;
  let consumedJump = false;

  if (next.mode === "grabbed" && pointer) {
    next.x = pointer.x - PLAYER_SIZE.width / 2;
    next.y = pointer.y - PLAYER_SIZE.height / 2;
    next.vx = 0;
    next.vy = 0;
    next.grounded = false;
    next.state = "grabbed";

    return {
      player: next,
      safeSpawn,
      lastGroundedAt,
      consumedJump,
    };
  }

  if (next.mode === "chase" && typeof next.chaseTargetX === "number") {
    const delta = next.chaseTargetX - (next.x + PLAYER_SIZE.width / 2);
    const direction = Math.sign(delta);

    if (Math.abs(delta) <= 12) {
      next.mode = "platformer";
      next.chaseTargetX = undefined;
    } else if (direction !== 0) {
      next.vx += direction * accel * 1.25 * dt;
      next.facing = direction > 0 ? 1 : -1;

      if (next.grounded && Math.abs(delta) > 96 && Math.abs(next.vx) < 0.8) {
        next.vy = PHYSICS.jumpImpulse * 0.72;
        next.grounded = false;
      }
    }
  }

  if (next.mode === "platformer" && controls.left) {
    next.vx -= accel * dt;
    next.facing = -1;
  }

  if (next.mode === "platformer" && controls.right) {
    next.vx += accel * dt;
    next.facing = 1;
  }

  if (
    (next.mode === "platformer" && !controls.left && !controls.right) ||
    (next.mode === "chase" && typeof next.chaseTargetX !== "number")
  ) {
    next.vx *= Math.pow(PHYSICS.friction, dt);
  }

  next.vx = clamp(next.vx, -PHYSICS.maxRunSpeed, PHYSICS.maxRunSpeed);

  const jumpBuffered = now - jumpQueuedAt <= PHYSICS.jumpBufferMs;
  const canCoyoteJump = next.grounded || now - lastGroundedAt <= PHYSICS.coyoteMs;

  if (next.mode === "platformer" && jumpBuffered && canCoyoteJump) {
    next.vy = PHYSICS.jumpImpulse;
    next.grounded = false;
    consumedJump = true;
  }

  next.vy += PHYSICS.gravity * dt;
  next.vy = Math.min(next.vy, PHYSICS.maxFallSpeed);
  next.x += next.vx * dt;
  next.y += next.vy * dt;
  next.x = clamp(next.x, world.minX ?? 24, world.width - PLAYER_SIZE.width - 24);
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

  if (next.y > world.height + 220) {
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

export function nextCamera(
  player: Player,
  camera: Camera,
  viewport: { width: number; height: number },
  world: { width: number; height: number }
) {
  const target = {
    x: clamp(player.x - viewport.width * 0.42, 0, Math.max(0, world.width - viewport.width)),
    y: clamp(player.y - viewport.height * 0.38, 0, Math.max(0, world.height - viewport.height)),
  };

  return {
    x: camera.x + (target.x - camera.x) * PHYSICS.cameraLerp,
    y: camera.y + (target.y - camera.y) * PHYSICS.cameraLerp,
  };
}

function getPlayerState(player: Player, now: number) {
  if (player.mode === "grabbed") {
    return "grabbed";
  }

  if (player.mode === "chase" && Math.abs(player.vx) > 0.4) {
    return "chase";
  }

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
