import type { CSSProperties } from "react";
import { Character } from "../character/character";
import { PlatformLayer } from "../platforms/platform-layer";
import { GameZones } from "../zones/game-zones";
import { decorativeElements, zones } from "../../config/zones";
import { WORLD } from "../../config/world";
import type { Camera, GameProgress, Player } from "../../types";
import styles from "./game-world.module.css";

export function GameWorld({
  camera,
  player,
  activeObject,
  progress,
  reducedMotion,
}: {
  camera: Camera;
  player: Player;
  activeObject: string;
  progress: GameProgress;
  reducedMotion: boolean;
}) {
  return (
    <div
      className={styles.viewport}
      style={
        {
          "--camera-x": `${camera.x}px`,
          "--camera-y": `${camera.y}px`,
          "--world-width": `${WORLD.width}px`,
          "--world-height": `${WORLD.height}px`,
        } as CSSProperties
      }
    >
      <div className={styles.world}>
        <ParallaxSky camera={camera} reducedMotion={reducedMotion} />
        <ZoneBands />
        <Decorations />
        <GameZones activeObject={activeObject} collected={progress.collected} />
        <PlatformLayer />
        <Character player={player} />
      </div>
    </div>
  );
}

function ParallaxSky({
  camera,
  reducedMotion,
}: {
  camera: Camera;
  reducedMotion: boolean;
}) {
  const offset = reducedMotion ? 0 : camera.y * 0.06;

  return (
    <div className={styles.sky} style={{ transform: `translate3d(0, ${offset}px, 0)` }} aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className={styles.cloud}
          style={{
            left: `${(index * 151) % WORLD.width}px`,
            top: `${180 + index * 306}px`,
            animationDelay: `${index * 0.38}s`,
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
          className={styles.zoneBand}
          style={
            {
              top: zone.y,
              height: zone.height,
              "--zone-accent": zone.accent,
            } as CSSProperties
          }
          aria-hidden="true"
        >
          <span>{zone.label}</span>
          <small>{zone.subtitle}</small>
        </div>
      ))}
    </>
  );
}

function Decorations() {
  return (
    <>
      {decorativeElements.map((item) => (
        <span
          key={item.id}
          className={`${styles.decor} ${styles[item.kind]}`}
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
