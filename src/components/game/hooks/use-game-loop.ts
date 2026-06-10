"use client";

import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
import { buildProgress, getActiveObject, getCurrentZone, getNearbyCollectible } from "../lib/interactions";
import { nextCamera, stepPlayer } from "../lib/physics";
import type { Camera, ControlsState, GameProgress, Player } from "../types";

type UseGameLoopArgs = {
  paused: boolean;
  playerRef: MutableRefObject<Player>;
  cameraRef: MutableRefObject<Camera>;
  viewportRef: MutableRefObject<{ width: number; height: number }>;
  controlsRef: MutableRefObject<ControlsState>;
  jumpQueuedAtRef: MutableRefObject<number>;
  progressRef: MutableRefObject<GameProgress>;
  safeSpawnRef: MutableRefObject<{ x: number; y: number }>;
  onPlayer: (player: Player) => void;
  onCamera: (camera: Camera) => void;
  onActiveObject: (id: string) => void;
  onProgress: (progress: GameProgress) => void;
  onJumpConsumed: () => void;
};

export function useGameLoop({
  paused,
  playerRef,
  cameraRef,
  viewportRef,
  controlsRef,
  jumpQueuedAtRef,
  progressRef,
  safeSpawnRef,
  onPlayer,
  onCamera,
  onActiveObject,
  onProgress,
  onJumpConsumed,
}: UseGameLoopArgs) {
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const lastGroundedAtRef = useRef(0);

  useEffect(() => {
    const tick = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const dt = Math.min((time - lastTime) / 16.67, 2);
      lastTimeRef.current = time;

      if (!paused) {
        const stepped = stepPlayer({
          player: playerRef.current,
          controls: controlsRef.current,
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

        const camera = nextCamera(stepped.player, cameraRef.current, viewportRef.current);
        cameraRef.current = camera;

        const currentZone = getCurrentZone(stepped.player.y);
        const collectible = getNearbyCollectible(stepped.player, progressRef.current.collected);
        const collected = collectible
          ? [...progressRef.current.collected, collectible.id]
          : progressRef.current.collected;
        const progress = buildProgress(progressRef.current, currentZone.id, collected);

        onProgress(progress);
        onActiveObject(getActiveObject(stepped.player));
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
    onActiveObject,
    onCamera,
    onJumpConsumed,
    onPlayer,
    onProgress,
    paused,
    playerRef,
    progressRef,
    safeSpawnRef,
    viewportRef,
  ]);
}
