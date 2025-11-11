import { useState } from "react";

interface GameStats {
  wins: number;
  losses: number;
  draws: number;
}

type GameResult = "win" | "loss" | "draw";

interface UseGameStatsReturn extends GameStats {
  updateStats: (result: GameResult) => void;
  resetStats: () => void;
}

const INITIAL_STATS: GameStats = { wins: 0, losses: 0, draws: 0 };
export const STATS_STORAGE_KEY = "tic-tac-cattle-toe-stats";

function loadStatsFromStorage(): GameStats {
  try {
    if (typeof window === "undefined") return INITIAL_STATS;

    const stored = localStorage.getItem(STATS_STORAGE_KEY);
    if (stored) {
      const parsedStats = JSON.parse(stored);
      return { ...INITIAL_STATS, ...parsedStats };
    }
  } catch (error) {
    console.warn("Failed to load game stats from localStorage:", error);
  }
  return INITIAL_STATS;
}

export function useGameStats(): UseGameStatsReturn {
  const [stats, setStats] = useState<GameStats>(loadStatsFromStorage);

  const resetStats = () => {
    setStats(INITIAL_STATS);
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(INITIAL_STATS));
    } catch (error) {
      console.warn("Failed to save reset stats to localStorage:", error);
    }
  };

  const updateStats = (result: GameResult) => {
    setStats((prevStats) => {
      const updatedStats = {
        ...prevStats,
        [result === "win" ? "wins" : result === "loss" ? "losses" : "draws"]:
          prevStats[
            result === "win" ? "wins" : result === "loss" ? "losses" : "draws"
          ] + 1,
      };

      // Save to localStorage when updating through the hook
      try {
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updatedStats));
      } catch (error) {
        console.warn("Failed to save game stats to localStorage:", error);
      }

      return updatedStats;
    });
  };

  return {
    ...stats,
    updateStats,
    resetStats,
  };
}
