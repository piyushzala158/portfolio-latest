import Link from "next/link";
import { Home, MapPin, Pause, RotateCcw } from "lucide-react";
import type { GameProgress, Zone } from "../../types";
import styles from "./game-hud.module.css";

export function GameHud({
  currentZone,
  progress,
  onPause,
  onReset,
}: {
  currentZone: Zone;
  progress: GameProgress;
  onPause: () => void;
  onReset: () => void;
}) {
  return (
    <div className={styles.hud} aria-label="Game progress">
      <div className={styles.location}>
        <MapPin className={styles.locationIcon} aria-hidden="true" />
        <div>
          <p className={styles.eyebrow}>Current section</p>
          <p className={styles.title}>{currentZone.label}</p>
        </div>
      </div>
      <div className={styles.progressTrack} aria-label={`${progress.completion}% complete`}>
        <span style={{ width: `${progress.completion}%` }} />
      </div>
      <div className={styles.meta}>
        <span>{progress.completion}%</span>
        <span>{progress.discovered.length}/7 zones</span>
        <span>{progress.collected.length}/3 trophies</span>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onReset} aria-label="Reset game progress">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={onPause} aria-label="Pause game">
          <Pause className="h-4 w-4" aria-hidden="true" />
        </button>
        <Link href="/" aria-label="Exit game mode">
          <Home className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
