import { useMemo, useRef } from "react";
import { PLAYER_SIZE } from "../../config/world";
import { useCharacterGsap } from "../../hooks/use-character-gsap";
import type { Player } from "../../types";
import styles from "./character.module.css";

export function Character({
  player,
  eyeOffset,
  handlers,
  reducedMotion,
}: {
  player: Player;
  eyeOffset: { x: number; y: number };
  handlers: {
    onPointerDown: (event: React.PointerEvent) => void;
    onPointerUp: (event: React.PointerEvent) => void;
    onPointerMove: (event: React.PointerEvent) => void;
  };
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const scarfRef = useRef<HTMLSpanElement>(null);
  const leftArmRef = useRef<HTMLSpanElement>(null);
  const rightArmRef = useRef<HTMLSpanElement>(null);
  const leftLegRef = useRef<HTMLSpanElement>(null);
  const rightLegRef = useRef<HTMLSpanElement>(null);

  const refs = useMemo(
    () => ({
      root: rootRef,
      head: headRef,
      body: bodyRef,
      scarf: scarfRef,
      leftArm: leftArmRef,
      rightArm: rightArmRef,
      leftLeg: leftLegRef,
      rightLeg: rightLegRef,
    }),
    []
  );

  useCharacterGsap({ player, refs, reducedMotion });

  return (
    <div
      ref={rootRef}
      className={`${styles.character} ${styles[player.state]}`}
      style={{
        left: player.x,
        top: player.y,
        width: PLAYER_SIZE.width,
        height: PLAYER_SIZE.height,
        transform: `scaleX(${player.facing})`,
      }}
      aria-hidden="true"
      data-game-character="true"
      {...handlers}
    >
      <span className={styles.shadow} />
      <span className={styles.backpack} />
      <span ref={headRef} className={styles.head}>
        <span className={styles.face} />
        <span className={`${styles.eye} ${styles.eyeLeft}`}>
          <span
            className={styles.pupil}
            style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}
          />
        </span>
        <span className={`${styles.eye} ${styles.eyeRight}`}>
          <span
            className={styles.pupil}
            style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}
          />
        </span>
        <span className={styles.smile} />
      </span>
      <span ref={scarfRef} className={styles.scarf} />
      <span ref={bodyRef} className={styles.body} />
      <span ref={leftArmRef} className={`${styles.arm} ${styles.leftArm}`} />
      <span ref={rightArmRef} className={`${styles.arm} ${styles.rightArm}`} />
      <span ref={leftLegRef} className={`${styles.leg} ${styles.leftLeg}`} />
      <span ref={rightLegRef} className={`${styles.leg} ${styles.rightLeg}`} />
    </div>
  );
}
