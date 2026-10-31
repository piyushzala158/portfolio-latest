import { WORLD } from "../../config/world";
import type { Rect } from "../../types";
import styles from "./platform-layer.module.css";

export function PlatformLayer({
  platforms,
  activePlatformId,
}: {
  platforms: Rect[];
  activePlatformId?: string;
}) {
  return (
    <>
      {platforms.map((platform) => (
        <Platform key={platform.id} platform={platform} active={activePlatformId === platform.id} />
      ))}
    </>
  );
}

function Platform({ platform, active }: { platform: Rect; active: boolean }) {
  return (
    <div
      className={`${styles.platform} ${styles[platform.kind ?? "main"]} ${
        WORLD.debugPlatforms ? styles.debug : ""
      } ${active ? styles.active : ""}`}
      style={{
        left: platform.x,
        top: platform.y,
        width: platform.width,
        height: platform.height,
      }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}
