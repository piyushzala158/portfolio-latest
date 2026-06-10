"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ControlsState } from "../types";

export function useGameControls(onPause: () => void) {
  const controlsRef = useRef<ControlsState>({ left: false, right: false, jump: false });
  const jumpQueuedAtRef = useRef(0);

  const setControl = useCallback(
    (control: keyof ControlsState, active: boolean) => {
      controlsRef.current[control] = active;
      if (control === "jump" && active) {
        jumpQueuedAtRef.current = performance.now();
      }
    },
    []
  );

  const consumeJump = useCallback(() => {
    jumpQueuedAtRef.current = 0;
    controlsRef.current.jump = false;
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
        setControl("left", true);
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        setControl("right", true);
      }

      if (event.code === "Space") {
        event.preventDefault();
        setControl("jump", true);
      }

      if (event.key === "Escape") {
        onPause();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        setControl("left", false);
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        setControl("right", false);
      }

      if (event.code === "Space") {
        setControl("jump", false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onPause, setControl]);

  return {
    controlsRef,
    jumpQueuedAtRef,
    setControl,
    consumeJump,
  };
}
