"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GameHud } from "./components/hud/game-hud";
import { GameMenu } from "./components/menu/game-menu";
import { MobileControls } from "./components/mobile-controls/mobile-controls";
import { GameWorld } from "./components/world/game-world";
import { zones } from "./config/zones";
import { gameThemeVars } from "./config/theme";
import { initialCamera, initialPlayer, initialViewport, WORLD } from "./config/world";
import { useGameControls } from "./hooks/use-game-controls";
import { useGameLoop } from "./hooks/use-game-loop";
import { useGameProgress } from "./hooks/use-game-progress";
import type { Camera, Player } from "./types";
import styles from "./portfolio-game.module.css";

export function PortfolioGame() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player>(initialPlayer);
  const cameraRef = useRef<Camera>(initialCamera);
  const viewportRef = useRef(initialViewport);
  const safeSpawnRef = useRef<{ x: number; y: number }>({
    x: WORLD.spawnX,
    y: WORLD.spawnY,
  });

  const [player, setPlayer] = useState(initialPlayer);
  const [camera, setCamera] = useState(initialCamera);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeObject, setActiveObject] = useState("spawn-panel");

  const { progress, progressRef, setProgress, resetProgress, restoreProgress } =
    useGameProgress();

  const openMenu = useCallback(() => {
    setPaused(true);
    setMenuOpen(true);
  }, []);

  const { controlsRef, jumpQueuedAtRef, setControl, consumeJump } =
    useGameControls(openMenu);

  const resetRun = useCallback(() => {
    playerRef.current = initialPlayer;
    cameraRef.current = initialCamera;
    safeSpawnRef.current = { x: WORLD.spawnX, y: WORLD.spawnY };
    resetProgress();
    setPlayer(initialPlayer);
    setCamera(initialCamera);
  }, [resetProgress]);

  const resumeGame = useCallback(() => {
    setPaused(false);
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const restored = restoreProgress();
      if (!restored) {
        return;
      }

      playerRef.current = restored.player;
      safeSpawnRef.current = { x: restored.player.x, y: restored.player.y };
      setPlayer(restored.player);
    }, 0);

    return () => window.clearTimeout(id);
  }, [restoreProgress]);

  useEffect(() => {
    const updateViewport = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      viewportRef.current = {
        width: rect?.width ?? window.innerWidth,
        height: rect?.height ?? window.innerHeight,
      };
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useGameLoop({
    paused: paused || menuOpen,
    playerRef,
    cameraRef,
    viewportRef,
    controlsRef,
    jumpQueuedAtRef,
    progressRef,
    safeSpawnRef,
    onPlayer: setPlayer,
    onCamera: setCamera,
    onActiveObject: setActiveObject,
    onProgress: setProgress,
    onJumpConsumed: consumeJump,
  });

  const currentZone =
    zones.find((zone) => zone.id === progress.currentSection) ?? zones[0];

  return (
    <section
      ref={containerRef}
      className={styles.shell}
      style={gameThemeVars}
      aria-label="Portfolio Game Mode"
    >
      <h1 className="sr-only">Portfolio Game Mode - Piyush Zala</h1>
      <GameHud
        currentZone={currentZone}
        progress={progress}
        onPause={openMenu}
        onReset={resetRun}
      />
      <GameWorld
        camera={camera}
        player={player}
        activeObject={activeObject}
        progress={progress}
        reducedMotion={Boolean(reducedMotion)}
      />
      <MobileControls setControl={setControl} />
      <GameMenu
        open={menuOpen || paused}
        progress={progress}
        onResume={resumeGame}
        onClose={resumeGame}
        onReset={resetRun}
      />
      <div className={styles.scanline} aria-hidden="true" />
    </section>
  );
}
