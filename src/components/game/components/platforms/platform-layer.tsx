import { platforms } from "../../config/platforms";
import { WORLD } from "../../config/world";
import type { Rect } from "../../types";
import styles from "./platform-layer.module.css";

export function PlatformLayer() {
  return (
    <>
      {platforms.map((platform) => (
        <Platform key={platform.id} platform={platform} />
      ))}
    </>
  );
}

function Platform({ platform }: { platform: Rect }) {
  return (
    <div
      className={`${styles.platform} ${styles[platform.kind ?? "main"]} ${
        WORLD.debugPlatforms ? styles.debug : ""
      }`}
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
