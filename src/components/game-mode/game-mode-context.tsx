"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PortfolioGame } from "@/components/game/portfolio-game";

type GameModeContextValue = {
  isGameMode: boolean;
  enterGameMode: () => void;
  exitGameMode: () => void;
  toggleGameMode: () => void;
};

const GameModeContext = createContext<GameModeContextValue | null>(null);
const STORAGE_KEY = "portfolio-game-mode";

export function GameModeProvider({ children }: { children: React.ReactNode }) {
  const [isGameMode, setIsGameMode] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        setIsGameMode(window.sessionStorage.getItem(STORAGE_KEY) === "on");
      } catch {
        setIsGameMode(false);
      }
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("game-mode-active", isGameMode);

    try {
      window.sessionStorage.setItem(STORAGE_KEY, isGameMode ? "on" : "off");
    } catch {
      // Session persistence is a convenience, not a requirement.
    }
  }, [isGameMode]);

  const enterGameMode = useCallback(() => setIsGameMode(true), []);
  const exitGameMode = useCallback(() => setIsGameMode(false), []);
  const toggleGameMode = useCallback(() => setIsGameMode((active) => !active), []);

  const value = useMemo(
    () => ({ isGameMode, enterGameMode, exitGameMode, toggleGameMode }),
    [enterGameMode, exitGameMode, isGameMode, toggleGameMode]
  );

  return (
    <GameModeContext.Provider value={value}>
      {children}
      {isGameMode && <PortfolioGame />}
      <span className="sr-only" aria-live="polite">
        {isGameMode ? "Game mode enabled" : "Game mode disabled"}
      </span>
    </GameModeContext.Provider>
  );
}

export function useGameMode() {
  const context = useContext(GameModeContext);

  if (!context) {
    throw new Error("useGameMode must be used inside GameModeProvider");
  }

  return context;
}
