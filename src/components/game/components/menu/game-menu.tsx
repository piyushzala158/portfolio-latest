import Link from "next/link";
import { BadgeCheck, Home, Play, RotateCcw, X } from "lucide-react";
import { motion } from "framer-motion";
import type { GameProgress } from "../../types";
import styles from "./game-menu.module.css";

const controlHints = [
  "A / Left: move left",
  "D / Right: move right",
  "Space: jump",
  "Esc: pause",
];

export function GameMenu({
  open,
  progress,
  onResume,
  onClose,
  onReset,
}: {
  open: boolean;
  progress: GameProgress;
  onResume: () => void;
  onClose: () => void;
  onReset: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-menu-title"
    >
      <motion.div
        className={styles.card}
        initial={{ y: 22, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close help">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className={styles.icon} aria-hidden="true">
          <Play className="h-6 w-6" />
        </div>
        <h2 id="game-menu-title">Game Mode</h2>
        <p>
          Descend through the portfolio, land on platforms, approach objects to
          reveal details, and collect milestone trophies along the way.
        </p>
        <div className={styles.grid}>
          {controlHints.map((hint) => (
            <span key={hint}>{hint}</span>
          ))}
        </div>
        <div className={styles.progress}>
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          <span>
            {progress.completion}% complete with {progress.discovered.length} zones discovered.
          </span>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={onResume}>
            <Play className="h-4 w-4" aria-hidden="true" />
            Start
          </button>
          <button type="button" onClick={onReset}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
          <Link href="/">
            <Home className="h-4 w-4" aria-hidden="true" />
            Traditional portfolio
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
