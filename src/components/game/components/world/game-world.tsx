import type { CSSProperties } from "react";
import { Character } from "../character/character";
import { PlatformLayer } from "../platforms/platform-layer";
import type { Camera, Player, Rect, SectionBand } from "../../types";
import styles from "./game-world.module.css";

export function GameWorld({
  camera,
  player,
  platforms,
  zoneBands,
  world,
  activePlatformId,
  eyeOffset,
  characterHandlers,
  reducedMotion,
}: {
  camera: Camera;
  player: Player;
  platforms: Rect[];
  zoneBands: SectionBand[];
  world: { width: number; height: number };
  activePlatformId?: string;
  eyeOffset: { x: number; y: number };
  characterHandlers: {
    onPointerDown: (event: React.PointerEvent) => void;
    onPointerUp: (event: React.PointerEvent) => void;
    onPointerMove: (event: React.PointerEvent) => void;
  };
  reducedMotion: boolean;
}) {
  return (
    <div
      className={styles.viewport}
      style={
        {
          "--camera-x": `${camera.x}px`,
          "--camera-y": `${camera.y}px`,
          "--world-width": `${world.width}px`,
          "--world-height": `${world.height}px`,
        } as CSSProperties
      }
    >
      <div className={styles.world}>
        <ZoneBands zoneBands={zoneBands} />
        <PlatformLayer platforms={platforms} activePlatformId={activePlatformId} />
        <Character
          player={player}
          eyeOffset={eyeOffset}
          handlers={characterHandlers}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
}

function ZoneBands({ zoneBands }: { zoneBands: SectionBand[] }) {
  return (
    <>
      {zoneBands.map((zone) => (
        <div
          key={zone.id}
          className={styles.zoneBand}
          style={
            {
              top: zone.top,
              height: zone.height,
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
