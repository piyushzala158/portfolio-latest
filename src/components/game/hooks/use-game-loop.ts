"use client";

import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
import { buildProgress, getCurrentZone } from "../lib/interactions";
import { nextCamera, stepPlayer } from "../lib/physics";
import { PLAYER_SIZE } from "../config/world";
import type { Camera, ControlsState, GameProgress, Player, Rect, SectionBand } from "../types";

type UseGameLoopArgs = {
  paused: boolean;
  playerRef: MutableRefObject<Player>;
  cameraRef: MutableRefObject<Camera>;
  viewportRef: MutableRefObject<{ width: number; height: number }>;
  platformsRef: MutableRefObject<Rect[]>;
  zoneBandsRef: MutableRefObject<SectionBand[]>;
  worldRef: MutableRefObject<{ width: number; height: number; minX?: number }>;
  pointerRef: MutableRefObject<{ x: number; y: number } | null>;
  controlsRef: MutableRefObject<ControlsState>;
  jumpQueuedAtRef: MutableRefObject<number>;
  progressRef: MutableRefObject<GameProgress>;
  safeSpawnRef: MutableRefObject<{ x: number; y: number }>;
  onPlayer: (player: Player) => void;
  onCamera: (camera: Camera) => void;
  onProgress: (progress: GameProgress) => void;
  onJumpConsumed: () => void;
  reducedMotion: boolean;
};

export function useGameLoop({
  paused,
  playerRef,
  cameraRef,
  viewportRef,
  platformsRef,
  zoneBandsRef,
  worldRef,
  pointerRef,
  controlsRef,
  jumpQueuedAtRef,
  progressRef,
  safeSpawnRef,
  onPlayer,
  onCamera,
  onProgress,
  onJumpConsumed,
  reducedMotion,
}: UseGameLoopArgs) {
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const lastGroundedAtRef = useRef(0);
  const followUntilRef = useRef(0);

  useEffect(() => {
    followUntilRef.current = performance.now() + 1200;
  }, []);

  useEffect(() => {
    const tick = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const dt = Math.min((time - lastTime) / 16.67, 2);
      lastTimeRef.current = time;

      if (!paused) {
        const stepped = stepPlayer({
          player: playerRef.current,
          controls: controlsRef.current,
          platforms: platformsRef.current,
          world: worldRef.current,
          pointer: pointerRef.current,
          dt,
          now: time,
          jumpQueuedAt: jumpQueuedAtRef.current,
          lastGroundedAt: lastGroundedAtRef.current,
          safeSpawn: safeSpawnRef.current,
        });

        playerRef.current = stepped.player;
        safeSpawnRef.current = stepped.safeSpawn;
        lastGroundedAtRef.current = stepped.lastGroundedAt;

        if (stepped.consumedJump) {
          onJumpConsumed();
        }

        const camera = nextCamera(
          stepped.player,
          cameraRef.current,
          viewportRef.current,
          worldRef.current
        );
        cameraRef.current = camera;

        // Follow the character while it moves (and briefly on start) so the
        // visitor can still scroll freely while standing still.
        const moving =
          !stepped.player.grounded ||
          Math.abs(stepped.player.vx) > 0.15 ||
          stepped.player.mode !== "platformer";

        if (moving || time < followUntilRef.current) {
          const viewportHeight = viewportRef.current.height;
          const targetScroll = Math.min(
            Math.max(0, worldRef.current.height - viewportHeight),
            Math.max(0, stepped.player.y + PLAYER_SIZE.height - viewportHeight * 0.78)
          );
          const delta = targetScroll - window.scrollY;

          if (Math.abs(delta) > 1) {
            window.scrollTo({
              top: reducedMotion ? targetScroll : window.scrollY + delta * Math.min(1, 0.14 * dt),
              behavior: "instant",
            });
          }
        }

        const currentZone = getCurrentZone(stepped.player.y, zoneBandsRef.current);
        const progress = buildProgress(progressRef.current, currentZone.id);

        onProgress(progress);
        onPlayer(stepped.player);
        onCamera(camera);
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    cameraRef,
    controlsRef,
    jumpQueuedAtRef,
    onCamera,
    onJumpConsumed,
    onPlayer,
    onProgress,
    platformsRef,
    pointerRef,
    paused,
    playerRef,
    progressRef,
    reducedMotion,
    safeSpawnRef,
    viewportRef,
    worldRef,
    zoneBandsRef,
  ]);
}
