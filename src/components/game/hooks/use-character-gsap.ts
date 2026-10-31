"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import type { Player } from "../types";

type CharacterRefs = {
  root: React.RefObject<HTMLDivElement | null>;
  head: React.RefObject<HTMLSpanElement | null>;
  body: React.RefObject<HTMLSpanElement | null>;
  scarf: React.RefObject<HTMLSpanElement | null>;
  leftArm: React.RefObject<HTMLSpanElement | null>;
  rightArm: React.RefObject<HTMLSpanElement | null>;
  leftLeg: React.RefObject<HTMLSpanElement | null>;
  rightLeg: React.RefObject<HTMLSpanElement | null>;
};

export function useCharacterGsap({
  player,
  refs,
  reducedMotion,
}: {
  player: Player;
  refs: CharacterRefs;
  reducedMotion: boolean;
}) {
  useEffect(() => {
    const parts = [
      refs.root.current,
      refs.head.current,
      refs.body.current,
      refs.scarf.current,
      refs.leftArm.current,
      refs.rightArm.current,
      refs.leftLeg.current,
      refs.rightLeg.current,
    ].filter(Boolean);

    gsap.killTweensOf(parts);
    gsap.set(parts, { clearProps: "rotate,scale,scaleX,scaleY,x,y" });

    if (reducedMotion) {
      return;
    }

    const timeline = gsap.timeline();
    const speed = Math.max(0.24, Math.min(0.58, 3.2 / Math.max(3.2, Math.abs(player.vx))));

    if (player.state === "idle") {
      timeline
        .to(refs.head.current, { y: -3, duration: 0.8, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.scarf.current, { rotate: -7, scaleX: 0.9, duration: 0.75, yoyo: true, repeat: -1 }, 0);
    }

    if (player.state === "walk" || player.state === "run" || player.state === "chase") {
      const swing = player.state === "chase" ? 34 : player.state === "run" ? 28 : 16;
      timeline
        .to(refs.root.current, { rotate: player.state === "chase" ? player.facing * 5 : 0, duration: 0.15 }, 0)
        .to(refs.leftArm.current, { rotate: swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.rightArm.current, { rotate: -swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.leftLeg.current, { rotate: -swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.rightLeg.current, { rotate: swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0);
    }

    if (player.state === "jump") {
      timeline
        .to(refs.body.current, { scaleY: 1.08, duration: 0.12 }, 0)
        .to([refs.leftArm.current, refs.rightArm.current], { rotate: -28, duration: 0.12 }, 0);
    }

    if (player.state === "fall" || player.state === "grabbed") {
      timeline
        .to(refs.body.current, { scaleY: 1.05, duration: 0.12 }, 0)
        .to(refs.leftArm.current, { rotate: 24, duration: 0.12 }, 0)
        .to(refs.rightArm.current, { rotate: 24, duration: 0.12 }, 0)
        .to(refs.leftLeg.current, { rotate: player.state === "grabbed" ? -12 : 0, duration: 0.5, yoyo: true, repeat: player.state === "grabbed" ? -1 : 0 }, 0)
        .to(refs.rightLeg.current, { rotate: player.state === "grabbed" ? 12 : 0, duration: 0.5, yoyo: true, repeat: player.state === "grabbed" ? -1 : 0 }, 0);
    }

    if (player.state === "land") {
      timeline.fromTo(
        refs.body.current,
        { scaleY: 0.86, scaleX: 1.08 },
        { scaleY: 1, scaleX: 1, duration: 0.16, ease: "back.out(2)" }
      );
    }

    return () => {
      timeline.kill();
    };
  }, [player.facing, player.state, player.vx, reducedMotion, refs]);
}
