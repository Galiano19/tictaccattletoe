"use client";

import { useState } from "react";
import GameBoard from "./components/GameBoard";
import { GameState, INITIAL_BOARD } from "./types/game";
import styles from "./page.module.css";
import { opponentMove, playerMove } from "./utils";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    board: INITIAL_BOARD,
    currentPlayer: "X",
    gameStatus: "playing",
    winner: null,
    winningLine: null,
    difficulty: "easy",
  });

  const handleCellClick = (position: number) => {
    playerMove(position, gameState, setGameState);

    // Delay opponent move to allow React to re-render with player's move first
    setTimeout(() => {
      setGameState((currentState) => {
        // Only make opponent move if it's now the opponent's turn and game is still playing
        if (
          currentState.currentPlayer === "O" &&
          currentState.gameStatus === "playing"
        ) {
          opponentMove(currentState, setGameState);
        }
        return currentState;
      });
    }, 500); // Small delay to show player move first
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={gameState.gameStatus !== "playing"}
        />
      </main>
    </div>
  );
}
