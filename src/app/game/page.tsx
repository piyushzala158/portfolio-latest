import type { Metadata } from "next";
import { PortfolioGame } from "@/components/game/portfolio-game";

export const metadata: Metadata = {
  title: "Game Mode - Piyush Zala Portfolio",
  description:
    "Explore Piyush Zala's portfolio as a playable vertical platform experience.",
};

export default function GamePage() {
  return <PortfolioGame />;
}
