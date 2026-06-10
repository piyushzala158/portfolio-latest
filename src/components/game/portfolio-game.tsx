"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronUp,
  Code2,
  ExternalLink,
  Home,
  Mail,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";
import { DATA } from "@/data/portfolio";
import type { Project, SkillCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type Rect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind?: "main" | "small" | "moving" | "decor";
};

type Zone = {
  id: ZoneId;
  label: string;
  subtitle: string;
  y: number;
  color: string;
};

type ZoneId =
  | "spawn"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "contact";

type Player = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  grounded: boolean;
  facing: 1 | -1;
  state: "idle" | "walk" | "jump" | "fall";
};

type GameProgress = {
  currentSection: ZoneId;
  discovered: ZoneId[];
  collected: string[];
  completion: number;
};

const WORLD = {
  width: 1280,
  height: 5480,
  spawnX: 150,
  spawnY: 275,
};

const PLAYER = {
  width: 42,
  height: 58,
};

const PROGRESS_KEY = "portfolio-game-progress-v1";

const zones: Zone[] = [
  {
    id: "spawn",
    label: "Spawn",
    subtitle: "Portfolio launch pad",
    y: 120,
    color: "var(--accent-blue)",
  },
  {
    id: "about",
    label: "About",
    subtitle: "A floating introduction island",
    y: 820,
    color: "var(--accent-cyan)",
  },
  {
    id: "skills",
    label: "Skills",
    subtitle: "Technology dungeon",
    y: 1550,
    color: "#22c55e",
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "Featured build platforms",
    y: 2480,
    color: "var(--accent-violet)",
  },
  {
    id: "experience",
    label: "Experience",
    subtitle: "Timeline tower",
    y: 3650,
    color: "#f59e0b",
  },
  {
    id: "achievements",
    label: "Achievements",
    subtitle: "Collectible milestones",
    y: 4450,
    color: "var(--accent-rose)",
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "Final connection gate",
    y: 5080,
    color: "var(--accent-blue)",
  },
];

const platforms: Rect[] = [
  { id: "spawn-main", x: 70, y: 360, width: 430, height: 28, kind: "main" },
  { id: "spawn-step", x: 520, y: 495, width: 190, height: 22, kind: "small" },
  { id: "about-approach", x: 710, y: 650, width: 210, height: 22, kind: "small" },
  { id: "about-main", x: 240, y: 900, width: 630, height: 30, kind: "main" },
  { id: "about-exit", x: 900, y: 1080, width: 220, height: 22, kind: "small" },
  { id: "skills-entry", x: 570, y: 1320, width: 230, height: 22, kind: "small" },
  { id: "skills-main", x: 155, y: 1620, width: 875, height: 30, kind: "main" },
  { id: "skills-low", x: 760, y: 1905, width: 260, height: 22, kind: "small" },
  { id: "projects-entry", x: 350, y: 2210, width: 220, height: 22, kind: "small" },
  { id: "projects-a", x: 110, y: 2565, width: 430, height: 30, kind: "main" },
  { id: "projects-b", x: 665, y: 2720, width: 450, height: 30, kind: "main" },
  { id: "projects-c", x: 200, y: 3050, width: 420, height: 30, kind: "main" },
  { id: "projects-d", x: 710, y: 3230, width: 390, height: 30, kind: "main" },
  { id: "experience-entry", x: 430, y: 3500, width: 260, height: 22, kind: "small" },
  { id: "experience-main", x: 260, y: 3745, width: 675, height: 30, kind: "main" },
  { id: "experience-low", x: 650, y: 4100, width: 285, height: 22, kind: "small" },
  { id: "achievements-main", x: 175, y: 4525, width: 860, height: 30, kind: "main" },
  { id: "contact-entry", x: 635, y: 4830, width: 260, height: 22, kind: "small" },
  { id: "contact-main", x: 280, y: 5160, width: 720, height: 30, kind: "main" },
];

const categoryOrder: SkillCategory[] = [
  "Frontend",
  "State Management",
  "Styling",
  "Backend",
  "Auth & Security",
  "Tools & Platforms",
];

const achievements = [
  {
    id: "ai-platforms",
    label: "AI Platform Builder",
    description: "Built multi-model AI and agent workflows.",
    x: 275,
    y: 4445,
  },
  {
    id: "realtime",
    label: "Realtime Systems",
    description: "Delivered SSE and WebSocket product experiences.",
    x: 525,
    y: 4385,
  },
  {
    id: "enterprise",
    label: "Enterprise Dashboards",
    description: "Designed data-heavy operational interfaces.",
    x: 780,
    y: 4455,
  },
];

const projectPositions = [
  { x: 150, y: 2360 },
  { x: 705, y: 2520 },
  { x: 235, y: 2860 },
  { x: 750, y: 3040 },
  { x: 170, y: 3275 },
  { x: 735, y: 3415 },
];

const controlHints = [
  "A / Left: move left",
  "D / Right: move right",
  "Space: jump",
  "Esc: pause",
];

const initialProgress: GameProgress = {
  currentSection: "spawn",
  discovered: ["spawn"],
  collected: [],
  completion: 0,
};

const initialPlayer: Player = {
  x: WORLD.spawnX,
  y: WORLD.spawnY,
  vx: 0,
  vy: 0,
  grounded: false,
  facing: 1,
  state: "fall",
};

const initialCamera = { x: 0, y: 0 };
const initialViewport = { width: 1024, height: 720 };

export function PortfolioGame() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const keysRef = useRef({ left: false, right: false, jump: false });
  const playerRef = useRef<Player>(initialPlayer);
  const cameraRef = useRef(initialCamera);
  const viewportRef = useRef(initialViewport);
  const safeSpawnRef = useRef({ x: WORLD.spawnX, y: WORLD.spawnY });
  const progressRef = useRef<GameProgress>(initialProgress);

  const [player, setPlayer] = useState(initialPlayer);
  const [camera, setCamera] = useState(initialCamera);
  const [paused, setPaused] = useState(false);
  const [helpOpen, setHelpOpen] = useState(true);
  const [progress, setProgress] = useState<GameProgress>(initialProgress);
  const [activeObject, setActiveObject] = useState<string>("spawn");

  const skillsByCategory = useMemo(
    () =>
      categoryOrder.map((category) => ({
        category,
        skills: DATA.skills.filter((skill) => skill.category === category),
      })),
    []
  );

  const completionTotal = zones.length + achievements.length;

  const saveProgress = useCallback((next: GameProgress) => {
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      // Progress is a bonus; gameplay should continue if storage is unavailable.
    }
  }, []);

  const updateProgress = useCallback(
    (playerY: number, collectedOverride?: string[]) => {
      const previousProgress = progressRef.current;
      const current =
        [...zones].reverse().find((zone) => playerY + PLAYER.height >= zone.y) ??
        zones[0];
      const collected = collectedOverride ?? previousProgress.collected;
      const discovered = Array.from(
        new Set([...previousProgress.discovered, current.id])
      );
      const completion = Math.round(
        ((discovered.length + collected.length) / completionTotal) * 100
      );
      const next: GameProgress = {
        currentSection: current.id,
        discovered,
        collected,
        completion,
      };

      setProgress((prev) => {
        if (
          prev.currentSection === next.currentSection &&
          prev.completion === next.completion &&
          prev.discovered.length === next.discovered.length &&
          prev.collected.length === next.collected.length
        ) {
          return prev;
        }
        progressRef.current = next;
        saveProgress(next);
        return next;
      });
    },
    [completionTotal, saveProgress]
  );

  const setControl = useCallback(
    (control: "left" | "right" | "jump", active: boolean) => {
      keysRef.current[control] = active;
    },
    []
  );

  const resetRun = useCallback(() => {
    const nextPlayer: Player = {
      x: WORLD.spawnX,
      y: WORLD.spawnY,
      vx: 0,
      vy: 0,
      grounded: false,
      facing: 1,
      state: "fall",
    };
    playerRef.current = nextPlayer;
    cameraRef.current = { x: 0, y: 0 };
    safeSpawnRef.current = { x: WORLD.spawnX, y: WORLD.spawnY };
    progressRef.current = initialProgress;
    setPlayer(nextPlayer);
    setCamera(cameraRef.current);
    setProgress(initialProgress);
    saveProgress(initialProgress);
  }, [saveProgress]);

  useEffect(() => {
    const restoreId = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(PROGRESS_KEY);
        if (!saved) {
          return;
        }

        const parsed = JSON.parse(saved) as GameProgress;
        if (
          !Array.isArray(parsed.discovered) ||
          !Array.isArray(parsed.collected)
        ) {
          return;
        }

        const restoredZone =
          zones.find((zone) => zone.id === parsed.currentSection) ?? zones[0];
        const platform =
          platforms.find((item) => item.y >= restoredZone.y + 80) ??
          platforms[0];
        const restoredPlayer: Player = {
          x: platform.x + 40,
          y: platform.y - PLAYER.height,
          vx: 0,
          vy: 0,
          grounded: true,
          facing: 1,
          state: "idle",
        };
        const restoredProgress = {
          currentSection: restoredZone.id,
          discovered: parsed.discovered.filter((id) =>
            zones.some((zone) => zone.id === id)
          ),
          collected: parsed.collected.filter((id) =>
            achievements.some((achievement) => achievement.id === id)
          ),
          completion: parsed.completion || 0,
        };

        playerRef.current = restoredPlayer;
        safeSpawnRef.current = { x: restoredPlayer.x, y: restoredPlayer.y };
        progressRef.current = restoredProgress;
        setPlayer(restoredPlayer);
        setProgress(restoredProgress);
      } catch {
        progressRef.current = initialProgress;
        setProgress(initialProgress);
      }
    }, 0);

    return () => window.clearTimeout(restoreId);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const next = {
        width: rect?.width ?? window.innerWidth,
        height: rect?.height ?? window.innerHeight,
      };
      viewportRef.current = next;
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isEditable) {
        return;
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keysRef.current.left = true;
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keysRef.current.right = true;
      }
      if (event.code === "Space") {
        event.preventDefault();
        keysRef.current.jump = true;
      }
      if (event.key === "Escape") {
        setPaused((value) => !value);
        setHelpOpen((value) => !value);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keysRef.current.left = false;
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keysRef.current.right = false;
      }
      if (event.code === "Space") {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const tick = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const dt = Math.min((time - lastTime) / 16.67, 2);
      lastTimeRef.current = time;

      if (!paused && !helpOpen) {
        const current = playerRef.current;
        const previous = { ...current };
        const input = keysRef.current;
        const next: Player = { ...current };
        const acceleration = input.left || input.right ? 0.92 : 0;
        const maxSpeed = 7.5;

        if (input.left) {
          next.vx -= acceleration * dt;
          next.facing = -1;
        }
        if (input.right) {
          next.vx += acceleration * dt;
          next.facing = 1;
        }
        if (!input.left && !input.right) {
          next.vx *= Math.pow(0.78, dt);
        }
        next.vx = Math.max(-maxSpeed, Math.min(maxSpeed, next.vx));

        if (input.jump && next.grounded) {
          next.vy = -16.2;
          next.grounded = false;
        }

        next.vy += 0.75 * dt;
        next.vy = Math.min(next.vy, 19);
        next.x += next.vx * dt;
        next.y += next.vy * dt;
        next.x = Math.max(24, Math.min(WORLD.width - PLAYER.width - 24, next.x));

        next.grounded = false;

        for (const platform of platforms) {
          const previousBottom = previous.y + PLAYER.height;
          const nextBottom = next.y + PLAYER.height;
          const overlapsX =
            next.x + PLAYER.width > platform.x &&
            next.x < platform.x + platform.width;
          const crossedTop =
            previousBottom <= platform.y + 4 && nextBottom >= platform.y;

          if (overlapsX && crossedTop && next.vy >= 0) {
            next.y = platform.y - PLAYER.height;
            next.vy = 0;
            next.grounded = true;
            safeSpawnRef.current = { x: next.x, y: next.y };
            break;
          }
        }

        if (next.y > WORLD.height + 220) {
          next.x = safeSpawnRef.current.x;
          next.y = safeSpawnRef.current.y;
          next.vx = 0;
          next.vy = 0;
          next.grounded = true;
        }

        if (!next.grounded) {
          next.state = next.vy < 0 ? "jump" : "fall";
        } else if (Math.abs(next.vx) > 0.7) {
          next.state = "walk";
        } else {
          next.state = "idle";
        }

        playerRef.current = next;

        const targetCamera = {
          x: Math.max(
            0,
            Math.min(WORLD.width - viewportRef.current.width, next.x - viewportRef.current.width * 0.42)
          ),
          y: Math.max(
            0,
            Math.min(WORLD.height - viewportRef.current.height, next.y - viewportRef.current.height * 0.36)
          ),
        };

        cameraRef.current = {
          x: cameraRef.current.x + (targetCamera.x - cameraRef.current.x) * 0.1,
          y: cameraRef.current.y + (targetCamera.y - cameraRef.current.y) * 0.1,
        };

        const playerCenter = {
          x: next.x + PLAYER.width / 2,
          y: next.y + PLAYER.height / 2,
        };
        const nearestAchievement = achievements.find((achievement) => {
          const dx = achievement.x - playerCenter.x;
          const dy = achievement.y - playerCenter.y;
          return Math.hypot(dx, dy) < 95;
        });

        if (
          nearestAchievement &&
          !progressRef.current.collected.includes(nearestAchievement.id)
        ) {
          const collected = [
            ...progressRef.current.collected,
            nearestAchievement.id,
          ];
          updateProgress(next.y, collected);
        } else {
          updateProgress(next.y);
        }

        setActiveObject(findActiveObject(playerCenter.x, playerCenter.y));
        setPlayer(next);
        setCamera(cameraRef.current);
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [helpOpen, paused, updateProgress]);

  const currentZone =
    zones.find((zone) => zone.id === progress.currentSection) ?? zones[0];

  return (
    <section
      ref={containerRef}
      className="game-shell"
      aria-label="Portfolio Game Mode"
    >
      <h1 className="sr-only">Portfolio Game Mode - Piyush Zala</h1>

      <GameHud
        currentZone={currentZone}
        progress={progress}
        onPause={() => {
          setPaused(true);
          setHelpOpen(true);
        }}
        onReset={resetRun}
      />

      <div
        className="game-viewport"
        style={{
          "--camera-x": `${camera.x}px`,
          "--camera-y": `${camera.y}px`,
          "--world-width": `${WORLD.width}px`,
          "--world-height": `${WORLD.height}px`,
        } as CSSProperties}
      >
        <div className="game-world">
          <ParallaxSky camera={camera} reducedMotion={Boolean(reducedMotion)} />
          <ZoneBands />
          <SpawnZone />
          <AboutZone activeObject={activeObject} />
          <SkillsZone groups={skillsByCategory} activeObject={activeObject} />
          <ProjectsZone activeObject={activeObject} />
          <ExperienceZone activeObject={activeObject} />
          <AchievementsZone collected={progress.collected} />
          <ContactZone activeObject={activeObject} />
          {platforms.map((platform) => (
            <Platform key={platform.id} platform={platform} />
          ))}
          <PlayerAvatar player={player} />
        </div>
      </div>

      <MobileControls setControl={setControl} />

      <AnimatePresenceShim open={helpOpen || paused}>
        <HelpOverlay
          progress={progress}
          onResume={() => {
            setPaused(false);
            setHelpOpen(false);
          }}
          onClose={() => {
            setPaused(false);
            setHelpOpen(false);
          }}
          onReset={resetRun}
        />
      </AnimatePresenceShim>

      <div className="game-scanline" aria-hidden="true" />
    </section>
  );
}

function AnimatePresenceShim({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  return open ? <>{children}</> : null;
}

function findActiveObject(playerX: number, playerY: number) {
  const objects = [
    { id: "about-sign", x: 380, y: 730 },
    { id: "skills-grid", x: 500, y: 1450 },
    { id: "experience-panel", x: 555, y: 3590 },
    { id: "contact-gate", x: 580, y: 4995 },
    ...DATA.projects.map((project, index) => ({
      id: `project-${project.title}`,
      x: projectPositions[index]?.x ?? 200,
      y: projectPositions[index]?.y ?? 2600,
    })),
  ];

  const nearest = objects
    .map((object) => ({
      ...object,
      distance: Math.hypot(object.x - playerX, object.y - playerY),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearest?.distance < 265 ? nearest.id : "";
}

function GameHud({
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
    <div className="game-hud" aria-label="Game progress">
      <div className="game-hud__panel">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        <div>
          <p className="game-hud__eyebrow">Current section</p>
          <p className="game-hud__title">{currentZone.label}</p>
        </div>
      </div>
      <div className="game-hud__progress" aria-label={`${progress.completion}% complete`}>
        <span style={{ width: `${progress.completion}%` }} />
      </div>
      <div className="game-hud__meta">
        <span>{progress.completion}%</span>
        <span>{progress.discovered.length}/{zones.length} zones</span>
        <span>{progress.collected.length}/{achievements.length} trophies</span>
      </div>
      <div className="game-hud__actions">
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

function HelpOverlay({
  progress,
  onResume,
  onClose,
  onReset,
}: {
  progress: GameProgress;
  onResume: () => void;
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div
      className="game-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-help-title"
    >
      <motion.div
        className="game-overlay__card"
        initial={{ y: 22, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <button
          type="button"
          className="game-overlay__close"
          onClick={onClose}
          aria-label="Close help"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="game-overlay__icon" aria-hidden="true">
          <Play className="h-6 w-6" />
        </div>
        <h2 id="game-help-title">Game Mode</h2>
        <p>
          Descend through the portfolio, land on platforms, approach objects to
          reveal details, and collect milestone trophies along the way.
        </p>
        <div className="game-overlay__grid">
          {controlHints.map((hint) => (
            <span key={hint}>{hint}</span>
          ))}
        </div>
        <div className="game-overlay__progress">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          <span>
            {progress.completion}% complete with {progress.discovered.length} zones
            discovered.
          </span>
        </div>
        <div className="game-overlay__actions">
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

function MobileControls({
  setControl,
}: {
  setControl: (control: "left" | "right" | "jump", active: boolean) => void;
}) {
  const bind = (control: "left" | "right" | "jump") => ({
    onPointerDown: () => setControl(control, true),
    onPointerUp: () => setControl(control, false),
    onPointerLeave: () => setControl(control, false),
    onPointerCancel: () => setControl(control, false),
  });

  return (
    <div className="game-mobile-controls" aria-label="Mobile game controls">
      <div className="game-mobile-controls__cluster">
        <button type="button" aria-label="Move left" {...bind("left")}>
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Move right" {...bind("right")}>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <button
        type="button"
        className="game-mobile-controls__jump"
        aria-label="Jump"
        {...bind("jump")}
      >
        <ChevronUp className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

function ParallaxSky({
  camera,
  reducedMotion,
}: {
  camera: { x: number; y: number };
  reducedMotion: boolean;
}) {
  const offset = reducedMotion ? 0 : camera.y * 0.08;

  return (
    <div
      className="game-sky"
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      aria-hidden="true"
    >
      {Array.from({ length: 14 }).map((_, index) => (
        <span
          key={index}
          className="game-cloud"
          style={{
            left: `${(index * 137) % WORLD.width}px`,
            top: `${220 + index * 355}px`,
            animationDelay: `${index * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

function ZoneBands() {
  return (
    <>
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="game-zone-band"
          style={
            {
              top: zone.y,
              "--zone-color": zone.color,
            } as CSSProperties
          }
          aria-hidden="true"
        >
          <span>{zone.label}</span>
        </div>
      ))}
    </>
  );
}

function SpawnZone() {
  return (
    <GameObject id="spawn" x={92} y={110} width={485}>
      <p className="game-kicker">Press Start</p>
      <h2>{DATA.name}</h2>
      <p>{DATA.description}</p>
      <div className="game-chip-row">
        {["Jump", "Explore", "Discover"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </GameObject>
  );
}

function AboutZone({ activeObject }: { activeObject: string }) {
  return (
    <GameObject
      id="about-sign"
      x={265}
      y={690}
      width={510}
      active={activeObject === "about-sign"}
    >
      <p className="game-kicker">Floating island</p>
      <h2>About Me</h2>
      <p>{DATA.summary}</p>
      <div className="game-chip-row">
        <span>{DATA.location}</span>
        <span>3+ years</span>
      </div>
    </GameObject>
  );
}

function SkillsZone({
  groups,
  activeObject,
}: {
  groups: { category: SkillCategory; skills: { name: string }[] }[];
  activeObject: string;
}) {
  return (
    <GameObject
      id="skills-grid"
      x={175}
      y={1355}
      width={840}
      active={activeObject === "skills-grid"}
      className="game-skills"
    >
      <p className="game-kicker">Skill dungeon</p>
      <h2>Skills & Technologies</h2>
      <div className="game-skill-grid">
        {groups.map(({ category, skills }, index) => (
          <div key={category} className="game-skill-card">
            <Code2 className="h-4 w-4" aria-hidden="true" />
            <h3>{category}</h3>
            <div className="game-skill-meter" aria-hidden="true">
              <span style={{ width: `${78 + index * 3}%` }} />
            </div>
            <p>{skills.map((skill) => skill.name).join(" / ")}</p>
          </div>
        ))}
      </div>
    </GameObject>
  );
}

function ProjectsZone({ activeObject }: { activeObject: string }) {
  return (
    <>
      <GameObject id="projects-heading" x={95} y={2265} width={430}>
        <p className="game-kicker">Project platforms</p>
        <h2>Featured Builds</h2>
        <p>Walk near a project platform to expand details and links.</p>
      </GameObject>
      {DATA.projects.map((project, index) => {
        const position = projectPositions[index] ?? { x: 150, y: 2500 };
        return (
          <ProjectObject
            key={project.title}
            project={project}
            index={index}
            x={position.x}
            y={position.y}
            active={activeObject === `project-${project.title}`}
          />
        );
      })}
    </>
  );
}

function ProjectObject({
  project,
  index,
  x,
  y,
  active,
}: {
  project: Project;
  index: number;
  x: number;
  y: number;
  active: boolean;
}) {
  return (
    <GameObject
      id={`project-${project.title}`}
      x={x}
      y={y}
      width={390}
      active={active}
      className="game-project"
    >
      <p className="game-kicker">Project {index + 1}</p>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <div className="game-chip-row">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="game-object__links">
        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live
          </a>
        ) : null}
        {project.github ? (
          <a href={project.github} target="_blank" rel="noreferrer">
            <GithubIcon className="h-4 w-4" />
            Code
          </a>
        ) : null}
      </div>
    </GameObject>
  );
}

function ExperienceZone({ activeObject }: { activeObject: string }) {
  return (
    <GameObject
      id="experience-panel"
      x={300}
      y={3510}
      width={610}
      active={activeObject === "experience-panel"}
      className="game-experience"
    >
      <p className="game-kicker">Timeline tower</p>
      <h2>Work Experience</h2>
      <div className="game-timeline-list">
        {DATA.experience.map((experience) => (
          <article key={`${experience.company}-${experience.period}`}>
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            <div>
              <h3>{experience.role}</h3>
              <p>
                {experience.company} - {experience.period}
              </p>
            </div>
          </article>
        ))}
      </div>
    </GameObject>
  );
}

function AchievementsZone({ collected }: { collected: string[] }) {
  return (
    <>
      <GameObject id="achievements-heading" x={230} y={4280} width={560}>
        <p className="game-kicker">Collectible milestones</p>
        <h2>Achievements</h2>
        <p>Approach each trophy to add it to your run progress.</p>
      </GameObject>
      {achievements.map((achievement) => {
        const isCollected = collected.includes(achievement.id);
        return (
          <div
            key={achievement.id}
            className={cn("game-trophy", isCollected && "is-collected")}
            style={{ left: achievement.x, top: achievement.y }}
            aria-label={`${achievement.label}: ${achievement.description}`}
          >
            <Trophy className="h-7 w-7" aria-hidden="true" />
            <span>{achievement.label}</span>
          </div>
        );
      })}
    </>
  );
}

function ContactZone({ activeObject }: { activeObject: string }) {
  const github = DATA.social.find((item) => item.name === "GitHub");
  const linkedin = DATA.social.find((item) => item.name === "LinkedIn");

  return (
    <GameObject
      id="contact-gate"
      x={325}
      y={4955}
      width={620}
      active={activeObject === "contact-gate"}
      className="game-contact"
    >
      <p className="game-kicker">Final gate</p>
      <h2>Contact</h2>
      <p>Open a channel and start the next quest.</p>
      <div className="game-contact-grid">
        <a href={`mailto:${DATA.email}`}>
          <Mail className="h-5 w-5" aria-hidden="true" />
          Email
        </a>
        {github ? (
          <a href={github.url} target="_blank" rel="noreferrer">
            <GithubIcon className="h-5 w-5" />
            GitHub
          </a>
        ) : null}
        {linkedin ? (
          <a href={linkedin.url} target="_blank" rel="noreferrer">
            <LinkedinIcon className="h-5 w-5" />
            LinkedIn
          </a>
        ) : null}
      </div>
    </GameObject>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GameObject({
  id,
  x,
  y,
  width,
  active = false,
  className,
  children,
}: {
  id: string;
  x: number;
  y: number;
  width: number;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      id={id}
      tabIndex={0}
      className={cn("game-object", active && "is-active", className)}
      style={{ left: x, top: y, width }}
      animate={{ y: active ? -10 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.article>
  );
}

function Platform({ platform }: { platform: Rect }) {
  return (
    <div
      className={cn("game-platform", `game-platform--${platform.kind ?? "main"}`)}
      style={{
        left: platform.x,
        top: platform.y,
        width: platform.width,
        height: platform.height,
      }}
      aria-hidden="true"
    />
  );
}

function PlayerAvatar({ player }: { player: Player }) {
  return (
    <div
      className={cn("game-player", `is-${player.state}`)}
      style={{
        left: player.x,
        top: player.y,
        width: PLAYER.width,
        height: PLAYER.height,
        transform: `scaleX(${player.facing})`,
      }}
      aria-hidden="true"
    >
      <span className="game-player__head" />
      <span className="game-player__body" />
      <span className="game-player__arm game-player__arm--left" />
      <span className="game-player__arm game-player__arm--right" />
      <span className="game-player__leg game-player__leg--left" />
      <span className="game-player__leg game-player__leg--right" />
    </div>
  );
}
