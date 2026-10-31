"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useGameMode } from "@/components/game-mode/game-mode-context";
import { GameHud } from "./components/hud/game-hud";
import { MobileControls } from "./components/mobile-controls/mobile-controls";
import { GameWorld } from "./components/world/game-world";
import { zones } from "./config/zones";
import { gameThemeVars } from "./config/theme";
import { initialCamera, initialPlayer, initialViewport, WORLD } from "./config/world";
import { useCharacterMouse } from "./hooks/use-character-mouse";
import { useGameControls } from "./hooks/use-game-controls";
import { useGameLoop } from "./hooks/use-game-loop";
import { useGameProgress } from "./hooks/use-game-progress";
import { useSectionPlatforms } from "./hooks/use-section-platforms";
import type { Camera, Player, Rect, SectionBand } from "./types";
import styles from "./portfolio-game.module.css";

export function PortfolioGame() {
  const reducedMotion = useReducedMotion();
  const { exitGameMode } = useGameMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player>(initialPlayer);
  const cameraRef = useRef<Camera>(initialCamera);
  const viewportRef = useRef(initialViewport);
  const platformsRef = useRef<Rect[]>([]);
  const zoneBandsRef = useRef<SectionBand[]>([]);
  const worldRef = useRef<{ width: number; height: number; minX?: number }>({
    width: WORLD.width,
    height: WORLD.height,
  });
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const safeSpawnRef = useRef<{ x: number; y: number }>({
    x: WORLD.spawnX,
    y: WORLD.spawnY,
  });

  const [player, setPlayer] = useState(initialPlayer);
  const [camera, setCamera] = useState(initialCamera);
  const [paused, setPaused] = useState(false);
  const [activePlatformId, setActivePlatformId] = useState<string | undefined>();
  const { platforms, zoneBands, worldWidth, worldHeight, minX, spawn } =
    useSectionPlatforms(true);

  const { progress, progressRef, setProgress, resetProgress, restoreProgress } =
    useGameProgress();

  const openMenu = useCallback(() => {
    setPaused((active) => !active);
  }, []);

  const { controlsRef, jumpQueuedAtRef, setControl, consumeJump } =
    useGameControls(openMenu);

  const resetRun = useCallback(() => {
    const nextPlayer = {
      ...initialPlayer,
      x: spawn.x,
      y: spawn.y,
      grounded: true,
      state: "idle" as const,
      landedAt: performance.now(),
    };

    playerRef.current = nextPlayer;
    cameraRef.current = initialCamera;
    safeSpawnRef.current = { x: spawn.x, y: spawn.y };
    resetProgress();
    setPlayer(nextPlayer);
    setCamera(initialCamera);
    setPaused(false);
  }, [resetProgress, spawn.x, spawn.y]);

  useEffect(() => {
    platformsRef.current = platforms;
    zoneBandsRef.current = zoneBands;
    worldRef.current = { width: worldWidth, height: worldHeight, minX };
  }, [minX, platforms, worldHeight, worldWidth, zoneBands]);

  useEffect(() => {
    if (platforms.length === 0) {
      return;
    }

    const nextPlayer = {
      ...initialPlayer,
      x: spawn.x,
      y: spawn.y,
      grounded: true,
      state: "idle" as const,
      landedAt: performance.now(),
    };

    playerRef.current = nextPlayer;
    safeSpawnRef.current = { x: spawn.x, y: spawn.y };
    const id = window.setTimeout(() => setPlayer(nextPlayer), 0);
    return () => window.clearTimeout(id);
  }, [platforms.length, spawn.x, spawn.y]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const restored = restoreProgress();
      if (!restored) {
        return;
      }

      progressRef.current = restored;
    }, 0);

    return () => window.clearTimeout(id);
  }, [progressRef, restoreProgress]);

  useEffect(() => {
    const updateViewport = () => {
      viewportRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const landedPlatform = platforms.find((platform) => {
      const playerBottom = player.y + 64;
      return player.grounded && Math.abs(playerBottom - platform.y) < 2;
    });

    if (!landedPlatform) {
      return;
    }

    const showId = window.setTimeout(() => setActivePlatformId(landedPlatform.id), 0);
    const hideId = window.setTimeout(() => setActivePlatformId(undefined), 280);
    return () => {
      window.clearTimeout(showId);
      window.clearTimeout(hideId);
    };
  }, [platforms, player.grounded, player.y]);

  const { eyeOffset, characterHandlers } = useCharacterMouse({
    playerRef,
    pointerRef,
    platformsRef,
    safeSpawnRef,
    onPlayer: setPlayer,
  });

  useGameLoop({
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
    onPlayer: setPlayer,
    onCamera: setCamera,
    onProgress: setProgress,
    onJumpConsumed: consumeJump,
    reducedMotion: Boolean(reducedMotion),
  });

  const currentZone =
    zones.find((zone) => zone.id === progress.currentSection) ?? zones[0];
  const world = useMemo(
    () => ({ width: worldWidth, height: worldHeight }),
    [worldHeight, worldWidth]
  );

  return (
    <section
      ref={containerRef}
      className={styles.shell}
      style={{ ...gameThemeVars, height: worldHeight }}
      aria-label="Portfolio Game Mode"
    >
      <h1 className="sr-only">Portfolio Game Mode - Piyush Zala</h1>
      <GameHud
        currentZone={currentZone}
        progress={progress}
        onPause={openMenu}
        onReset={resetRun}
        onExit={exitGameMode}
        paused={paused}
      />
      <GameWorld
        camera={camera}
        player={player}
        platforms={platforms}
        zoneBands={zoneBands}
        world={world}
        activePlatformId={activePlatformId}
        eyeOffset={eyeOffset}
        characterHandlers={characterHandlers}
        reducedMotion={Boolean(reducedMotion)}
      />
      <MobileControls setControl={setControl} disabled={player.mode === "grabbed"} />
    </section>
  );
}
