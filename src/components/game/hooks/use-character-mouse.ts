"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PLAYER_SIZE } from "../config/world";
import type { Player, Rect } from "../types";

const LONG_PRESS_MS = 450;

export function useCharacterMouse({
  playerRef,
  pointerRef,
  platformsRef,
  safeSpawnRef,
  onPlayer,
}: {
  playerRef: React.MutableRefObject<Player>;
  pointerRef: React.MutableRefObject<{ x: number; y: number } | null>;
  platformsRef: React.MutableRefObject<Rect[]>;
  safeSpawnRef: React.MutableRefObject<{ x: number; y: number }>;
  onPlayer: (player: Player) => void;
}) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const longPressRef = useRef<number | null>(null);
  const pressedRef = useRef(false);
  const grabbedRef = useRef(false);

  const updatePointer = useCallback(
    (event: PointerEvent | React.PointerEvent) => {
      pointerRef.current = {
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY,
      };
    },
    [pointerRef]
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event);
      const player = playerRef.current;
      const headCenter = {
        x: player.x + PLAYER_SIZE.width / 2,
        y: player.y + 15,
      };
      const pointer = pointerRef.current;

      if (!pointer) {
        return;
      }

      const angle = Math.atan2(pointer.y - headCenter.y, pointer.x - headCenter.x);
      setEyeOffset({
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2,
      });
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [playerRef, pointerRef, updatePointer]);

  const releaseGrab = useCallback(() => {
    if (longPressRef.current) {
      window.clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }

    const player = playerRef.current;
    if (player.mode !== "grabbed") {
      return;
    }

    const landedPlatform = platformsRef.current.find((platform) => {
      const playerCenterX = player.x + PLAYER_SIZE.width / 2;
      const playerBottom = player.y + PLAYER_SIZE.height;
      const withinX =
        playerCenterX >= platform.x - 8 && playerCenterX <= platform.x + platform.width + 8;
      const nearTop = Math.abs(playerBottom - platform.y) < 40;

      return withinX && nearTop;
    });

    const next: Player = landedPlatform
      ? {
          ...player,
          y: landedPlatform.y - PLAYER_SIZE.height,
          vx: 0,
          vy: 0,
          grounded: true,
          mode: "platformer",
          state: "idle",
          landedAt: performance.now(),
        }
      : {
          ...player,
          vx: player.facing * 1.8,
          vy: 2.5,
          grounded: false,
          mode: "platformer",
          state: "fall",
        };

    if (landedPlatform) {
      safeSpawnRef.current = { x: next.x, y: next.y };
    }

    playerRef.current = next;
    onPlayer(next);
  }, [onPlayer, platformsRef, playerRef, safeSpawnRef]);

  const chasePointer = useCallback(() => {
    const pointer = pointerRef.current;

    if (!pointer || playerRef.current.mode === "grabbed") {
      return;
    }

    const next: Player = {
      ...playerRef.current,
      mode: "chase",
      state: "chase",
      chaseTargetX: pointer.x,
    };
    playerRef.current = next;
    onPlayer(next);
  }, [onPlayer, playerRef, pointerRef]);

  useEffect(() => {
    const onWindowPointerUp = (event: PointerEvent) => {
      updatePointer(event);
      releaseGrab();
      pressedRef.current = false;
      grabbedRef.current = false;
    };

    window.addEventListener("pointerup", onWindowPointerUp);
    window.addEventListener("pointercancel", onWindowPointerUp);
    return () => {
      window.removeEventListener("pointerup", onWindowPointerUp);
      window.removeEventListener("pointercancel", onWindowPointerUp);
    };
  }, [releaseGrab, updatePointer]);

  useEffect(() => {
    const onWindowPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest("button,a,input,textarea,select,[data-game-character='true']")) {
        return;
      }

      updatePointer(event);
      chasePointer();
    };

    window.addEventListener("pointerdown", onWindowPointerDown);
    return () => window.removeEventListener("pointerdown", onWindowPointerDown);
  }, [chasePointer, updatePointer]);

  const characterHandlers = useMemo(
    () => ({
      onPointerDown: (event: React.PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();
        pressedRef.current = true;
        grabbedRef.current = false;
        updatePointer(event);
        event.currentTarget.setPointerCapture(event.pointerId);

        longPressRef.current = window.setTimeout(() => {
          const next: Player = {
            ...playerRef.current,
            mode: "grabbed",
            state: "grabbed",
            grounded: false,
            vx: 0,
            vy: 0,
          };
          grabbedRef.current = true;
          playerRef.current = next;
          onPlayer(next);
        }, LONG_PRESS_MS);
      },
      onPointerUp: (event: React.PointerEvent) => {
        event.preventDefault();
        event.stopPropagation();
        updatePointer(event);

        if (longPressRef.current) {
          window.clearTimeout(longPressRef.current);
          longPressRef.current = null;
        }

        if (grabbedRef.current || playerRef.current.mode === "grabbed") {
          releaseGrab();
        } else if (pressedRef.current) {
          chasePointer();
        }

        pressedRef.current = false;
        grabbedRef.current = false;
      },
      onPointerMove: (event: React.PointerEvent) => updatePointer(event),
    }),
    [chasePointer, onPlayer, playerRef, releaseGrab, updatePointer]
  );

  const setChaseTarget = useCallback(
    (event: React.PointerEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest("button,a,input,textarea,select")) {
        return;
      }

      updatePointer(event);
      chasePointer();
    },
    [chasePointer, updatePointer]
  );

  return {
    eyeOffset,
    characterHandlers,
    setChaseTarget,
  };
}
