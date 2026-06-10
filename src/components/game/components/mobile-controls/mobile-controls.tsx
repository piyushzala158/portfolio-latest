import { ArrowLeft, ArrowRight, ChevronUp } from "lucide-react";
import type { ControlsState } from "../../types";
import styles from "./mobile-controls.module.css";

export function MobileControls({
  setControl,
}: {
  setControl: (control: keyof ControlsState, active: boolean) => void;
}) {
  const bind = (control: keyof ControlsState) => ({
    onPointerDown: () => setControl(control, true),
    onPointerUp: () => setControl(control, false),
    onPointerLeave: () => setControl(control, false),
    onPointerCancel: () => setControl(control, false),
    onClick: () => {
      setControl(control, true);
      window.setTimeout(() => setControl(control, false), 140);
    },
  });

  return (
    <div className={styles.controls} aria-label="Mobile game controls">
      <div className={styles.cluster}>
        <button type="button" aria-label="Move left" {...bind("left")}>
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Move right" {...bind("right")}>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <button type="button" className={styles.jump} aria-label="Jump" {...bind("jump")}>
        <ChevronUp className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
