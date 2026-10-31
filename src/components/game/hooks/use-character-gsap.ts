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
  antenna?: React.RefObject<HTMLSpanElement | null>;
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
      refs.antenna?.current,
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
        .to(refs.head.current, { y: -2.5, duration: 0.85, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.body.current, { scaleY: 0.96, scaleX: 1.03, duration: 0.85, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.scarf.current, { rotate: -9, scaleX: 0.9, duration: 0.75, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.antenna?.current || [], { rotate: 8, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0);
    }

    if (player.state === "walk" || player.state === "run" || player.state === "chase") {
      const swing = player.state === "chase" ? 34 : player.state === "run" ? 28 : 18;
      const antennaBend = player.state === "chase" ? -22 : player.state === "run" ? -16 : -10;
      timeline
        .to(refs.root.current, { rotate: player.state === "chase" ? player.facing * 5 : 0, duration: 0.15 }, 0)
        .to(refs.body.current, { y: -2, duration: speed / 2, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.antenna?.current || [], { rotate: antennaBend, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.scarf.current, { rotate: -16, scaleX: 1.15, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.leftArm.current, { rotate: swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.rightArm.current, { rotate: -swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.leftLeg.current, { rotate: -swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0)
        .to(refs.rightLeg.current, { rotate: swing, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0);
    }

    if (player.state === "jump") {
      timeline
        .to(refs.body.current, { scaleY: 1.14, scaleX: 0.92, duration: 0.12, ease: "power2.out" }, 0)
        .to([refs.leftArm.current, refs.rightArm.current], { rotate: -36, duration: 0.12 }, 0)
        .to(refs.antenna?.current || [], { rotate: -20, duration: 0.12 }, 0);
    }

    if (player.state === "fall" || player.state === "grabbed") {
      timeline
        .to(refs.body.current, { scaleY: 1.06, scaleX: 0.96, duration: 0.12 }, 0)
        .to(refs.leftArm.current, { rotate: 26, duration: 0.12 }, 0)
        .to(refs.rightArm.current, { rotate: 26, duration: 0.12 }, 0)
        .to(refs.antenna?.current || [], { rotate: 16, duration: 0.25, yoyo: true, repeat: -1 }, 0)
        .to(refs.leftLeg.current, { rotate: player.state === "grabbed" ? -16 : 0, duration: 0.4, yoyo: true, repeat: player.state === "grabbed" ? -1 : 0 }, 0)
        .to(refs.rightLeg.current, { rotate: player.state === "grabbed" ? 16 : 0, duration: 0.4, yoyo: true, repeat: player.state === "grabbed" ? -1 : 0 }, 0);
    }

    if (player.state === "land") {
      timeline
        .fromTo(
          refs.body.current,
          { scaleY: 0.82, scaleX: 1.18 },
          { scaleY: 1, scaleX: 1, duration: 0.24, ease: "back.out(2)" },
          0
        )
        .fromTo(
          refs.antenna?.current || [],
          { rotate: -15 },
          { rotate: 0, duration: 0.28, ease: "elastic.out(1.2, 0.4)" },
          0
        );
    }

    return () => {
      timeline.kill();
    };
  }, [player.facing, player.state, player.vx, reducedMotion, refs]);
}
