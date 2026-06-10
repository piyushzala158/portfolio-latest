import { collectibles, gameObjects, zones } from "../config/zones";
import { PLAYER_SIZE } from "../config/world";
import type { GameProgress, Player, ZoneId } from "../types";

export function getCurrentZone(playerY: number) {
  return [...zones].reverse().find((zone) => playerY + PLAYER_SIZE.height >= zone.y) ?? zones[0];
}

export function getActiveObject(player: Player) {
  const center = getPlayerCenter(player);
  const nearest = gameObjects
    .map((object) => ({
      ...object,
      distance: Math.hypot(object.x - center.x, object.y - center.y),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearest && nearest.distance <= nearest.radius ? nearest.id : "";
}

export function getNearbyCollectible(player: Player, collected: string[]) {
  const center = getPlayerCenter(player);
  return collectibles.find((collectible) => {
    if (collected.includes(collectible.id)) {
      return false;
    }

    return Math.hypot(collectible.x - center.x, collectible.y - center.y) < 98;
  });
}

export function buildProgress(
  previous: GameProgress,
  currentSection: ZoneId,
  collected: string[]
) {
  const discovered = Array.from(new Set([...previous.discovered, currentSection]));
  const completionTotal = zones.length + collectibles.length;

  return {
    currentSection,
    discovered,
    collected,
    completion: Math.round(((discovered.length + collected.length) / completionTotal) * 100),
  };
}

function getPlayerCenter(player: Player) {
  return {
    x: player.x + PLAYER_SIZE.width / 2,
    y: player.y + PLAYER_SIZE.height / 2,
  };
}
