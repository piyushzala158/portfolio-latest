import { zones } from "../config/zones";
import { GAME_SECTIONS } from "../config/sections";
import { PLAYER_SIZE } from "../config/world";
import type { GameProgress, SectionBand, ZoneId } from "../types";

export function getCurrentZone(playerY: number, zoneBands: SectionBand[]) {
  const playerBottom = playerY + PLAYER_SIZE.height;
  const band = [...zoneBands]
    .reverse()
    .find((item) => playerBottom >= item.top && playerBottom <= item.top + item.height + 120);

  if (band) {
    return zones.find((zone) => zone.id === band.zoneId) ?? zones[0];
  }

  return zones.find((zone) => zone.id === GAME_SECTIONS[0].zoneId) ?? zones[0];
}

export function buildProgress(
  previous: GameProgress,
  currentSection: ZoneId
) {
  const discovered = Array.from(new Set([...previous.discovered, currentSection]));
  const completionTotal = GAME_SECTIONS.length;

  return {
    currentSection,
    discovered,
    collected: [],
    completion: Math.round((discovered.length / completionTotal) * 100),
  };
}
