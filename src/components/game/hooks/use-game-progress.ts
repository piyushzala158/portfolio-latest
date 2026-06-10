"use client";

import { useCallback, useRef, useState } from "react";
import { platforms } from "../config/platforms";
import { collectibles, zones } from "../config/zones";
import { initialProgress, PLAYER_SIZE, PROGRESS_KEY } from "../config/world";
import type { GameProgress, Player } from "../types";

export function useGameProgress() {
  const progressRef = useRef<GameProgress>(initialProgress);
  const [progress, setProgressState] = useState<GameProgress>(initialProgress);

  const saveProgress = useCallback((next: GameProgress) => {
    progressRef.current = next;
    setProgressState(next);

    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      // Progress persistence is non-essential.
    }
  }, []);

  const restoreProgress = useCallback(() => {
    try {
      const saved = window.localStorage.getItem(PROGRESS_KEY);
      if (!saved) {
        return null;
      }

      const parsed = JSON.parse(saved) as GameProgress;
      if (!Array.isArray(parsed.discovered) || !Array.isArray(parsed.collected)) {
        return null;
      }

      const restoredZone =
        zones.find((zone) => zone.id === parsed.currentSection) ?? zones[0];
      const platform =
        platforms.find((item) => item.y >= restoredZone.y + 80) ?? platforms[0];
      const restoredProgress: GameProgress = {
        currentSection: restoredZone.id,
        discovered: parsed.discovered.filter((id) =>
          zones.some((zone) => zone.id === id)
        ),
        collected: parsed.collected.filter((id) =>
          collectibles.some((collectible) => collectible.id === id)
        ),
        completion: parsed.completion || 0,
      };
      const restoredPlayer: Player = {
        x: platform.x + 42,
        y: platform.y - PLAYER_SIZE.height,
        vx: 0,
        vy: 0,
        grounded: true,
        facing: 1,
        state: "idle",
        landedAt: performance.now(),
      };

      progressRef.current = restoredProgress;
      setProgressState(restoredProgress);

      return {
        progress: restoredProgress,
        player: restoredPlayer,
      };
    } catch {
      progressRef.current = initialProgress;
      setProgressState(initialProgress);
      return null;
    }
  }, []);

  const setProgress = useCallback(
    (next: GameProgress) => {
      const prev = progressRef.current;
      if (
        prev.currentSection === next.currentSection &&
        prev.completion === next.completion &&
        prev.discovered.length === next.discovered.length &&
        prev.collected.length === next.collected.length
      ) {
        return;
      }

      saveProgress(next);
    },
    [saveProgress]
  );

  const resetProgress = useCallback(() => {
    saveProgress(initialProgress);
  }, [saveProgress]);

  return {
    progress,
    progressRef,
    setProgress,
    resetProgress,
    restoreProgress,
  };
}
