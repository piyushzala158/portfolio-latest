"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GAME_SECTIONS } from "../config/sections";
import { PLAYER_SIZE } from "../config/world";
import type { Rect, SectionBand } from "../types";

const PLATFORM_HEIGHT = 10;
const STEP_HEIGHT = 8;
const FLOOR_OFFSET = 28;
const MAX_STEP_RISE = 130;
const EDGE_PADDING = 16;
const DESKTOP_BREAKPOINT = 1024;
const DESKTOP_SIDEBAR_CLEARANCE = 112;

type SectionPlatforms = {
  platforms: Rect[];
  zoneBands: SectionBand[];
  worldWidth: number;
  worldHeight: number;
  minX: number;
  spawn: { x: number; y: number };
};

const initialState: SectionPlatforms = {
  platforms: [],
  zoneBands: [],
  worldWidth: 1024,
  worldHeight: 1800,
  minX: 24,
  spawn: { x: 138, y: 292 },
};

export function useSectionPlatforms(active: boolean) {
  const [state, setState] = useState<SectionPlatforms>(initialState);
  const timeoutRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    const pageWidth = document.documentElement.clientWidth || window.innerWidth;
    const pageHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );

    // Keep the playfield clear of the fixed desktop sidebar.
    const minX = pageWidth >= DESKTOP_BREAKPOINT ? DESKTOP_SIDEBAR_CLEARANCE : EDGE_PADDING;
    const maxX = pageWidth - EDGE_PADDING;
    const gapWidth = clamp(pageWidth * 0.32, 110, 220);
    const stepWidth = Math.round(gapWidth * 0.62);

    const measuredSections = GAME_SECTIONS.flatMap((section) => {
      const element = document.getElementById(section.id);

      if (!element) {
        return [];
      }

      const rect = element.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = Math.max(260, rect.height);

      return [{ section, top, height, floorY: top + height - FLOOR_OFFSET }];
    });

    const platforms: Rect[] = [];
    const lastIndex = measuredSections.length - 1;

    measuredSections.forEach((item, index) => {
      const isLast = index === lastIndex;
      // Alternate the drop gap: right, left, right...
      const gapOnRight = index % 2 === 0;
      const left = !isLast && !gapOnRight ? minX + gapWidth : minX;
      const right = !isLast && gapOnRight ? maxX - gapWidth : maxX;

      platforms.push({
        id: `${item.section.id}-platform`,
        x: left,
        y: item.floorY,
        width: right - left,
        height: PLATFORM_HEIGHT,
        kind: "main",
        zoneId: item.section.zoneId,
      });

      if (isLast) {
        return;
      }

      // Zig-zag staircase in the gap down to the next section's floor.
      const next = measuredSections[index + 1];
      const columnStart = gapOnRight ? maxX - gapWidth : minX;
      const drop = next.floorY - item.floorY;
      const stepCount = Math.max(0, Math.ceil(drop / MAX_STEP_RISE) - 1);
      const rise = drop / (stepCount + 1);

      for (let step = 1; step <= stepCount; step += 1) {
        // First step sits under the platform edge so walking off lands on it.
        const nearEdge = step % 2 === 1;
        const alignStart = gapOnRight ? nearEdge : !nearEdge;

        platforms.push({
          id: `${item.section.id}-step-${step}`,
          x: alignStart ? columnStart : columnStart + gapWidth - stepWidth,
          y: item.floorY + rise * step,
          width: stepWidth,
          height: STEP_HEIGHT,
          kind: "step",
          zoneId: next.section.zoneId,
        });
      }
    });

    const firstPlatform = platforms[0];
    const spawn = firstPlatform
      ? { x: firstPlatform.x + 40, y: firstPlatform.y - PLAYER_SIZE.height }
      : initialState.spawn;

    setState({
      platforms,
      zoneBands: measuredSections.map((item) => ({
        id: item.section.id,
        zoneId: item.section.zoneId,
        label: item.section.label,
        top: item.top,
        height: item.height,
      })),
      worldWidth: pageWidth,
      worldHeight: pageHeight,
      minX,
      spawn,
    });
  }, []);

  const scheduleMeasure = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(measure, 100);
  }, [measure]);

  useEffect(() => {
    if (!active) {
      return;
    }

    scheduleMeasure();
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    const main = document.querySelector("main");

    if (main) {
      resizeObserver.observe(main);
    }

    for (const section of GAME_SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) {
        resizeObserver.observe(element);
      }
    }

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("orientationchange", scheduleMeasure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [active, measure, scheduleMeasure]);

  return state;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
