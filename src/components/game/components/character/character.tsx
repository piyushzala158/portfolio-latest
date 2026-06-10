import { PLAYER_SIZE } from "../../config/world";
import type { Player } from "../../types";
import styles from "./character.module.css";

export function Character({ player }: { player: Player }) {
  return (
    <div
      className={`${styles.character} ${styles[player.state]}`}
      style={{
        left: player.x,
        top: player.y,
        width: PLAYER_SIZE.width,
        height: PLAYER_SIZE.height,
        transform: `scaleX(${player.facing})`,
      }}
      aria-hidden="true"
    >
      <span className={styles.shadow} />
      <span className={styles.backpack} />
      <span className={styles.head}>
        <span className={styles.face} />
        <span className={styles.eye} />
        <span className={styles.smile} />
      </span>
      <span className={styles.scarf} />
      <span className={styles.body} />
      <span className={`${styles.arm} ${styles.leftArm}`} />
      <span className={`${styles.arm} ${styles.rightArm}`} />
      <span className={`${styles.leg} ${styles.leftLeg}`} />
      <span className={`${styles.leg} ${styles.rightLeg}`} />
    </div>
  );
}
