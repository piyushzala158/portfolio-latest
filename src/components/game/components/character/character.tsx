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
  const antennaRef = useRef<HTMLSpanElement>(null);

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
      antenna: antennaRef,
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
      data-state={player.state}
      {...handlers}
    >
      <span className={styles.shadow} />

      {/* Backpack & Thruster */}
      <span className={styles.backpack}>
        <span className={styles.batteryGauge} />
        <span className={styles.thruster} />
      </span>

      {/* Head Assembly */}
      <span ref={headRef} className={styles.head}>
        {/* Antenna */}
        <span ref={antennaRef} className={styles.antenna}>
          <span className={styles.antennaStem} />
          <span className={styles.antennaBulb} />
        </span>

        {/* Ear Headphones */}
        <span className={`${styles.ear} ${styles.earLeft}`} />
        <span className={`${styles.ear} ${styles.earRight}`} />

        {/* OLED Face Visor Screen */}
        <span className={styles.face}>
          <span className={styles.faceSheen} />
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
          <span className={`${styles.blush} ${styles.blushLeft}`} />
          <span className={`${styles.blush} ${styles.blushRight}`} />
          <span className={styles.smile} />
        </span>
      </span>

      {/* Cyber Scarf */}
      <span ref={scarfRef} className={styles.scarf} />

      {/* Torso with glowing heart core */}
      <span ref={bodyRef} className={styles.body}>
        <span className={styles.chestCore} />
        <span className={styles.torsoLine} />
      </span>

      {/* Arms & Hands */}
      <span ref={leftArmRef} className={`${styles.arm} ${styles.leftArm}`}>
        <span className={styles.hand} />
      </span>
      <span ref={rightArmRef} className={`${styles.arm} ${styles.rightArm}`}>
        <span className={styles.hand} />
      </span>

      {/* Legs & Stomp Boots */}
      <span ref={leftLegRef} className={`${styles.leg} ${styles.leftLeg}`}>
        <span className={styles.bootGlow} />
      </span>
      <span ref={rightLegRef} className={`${styles.leg} ${styles.rightLeg}`}>
        <span className={styles.bootGlow} />
      </span>
    </div>
  );
}
