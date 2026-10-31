"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGameMode } from "./game-mode-context";

export function GameModeUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { enterGameMode } = useGameMode();

  useEffect(() => {
    if (searchParams.get("game") !== "1") {
      return;
    }

    enterGameMode();
    router.replace("/", { scroll: false });
  }, [enterGameMode, router, searchParams]);

  return null;
}
