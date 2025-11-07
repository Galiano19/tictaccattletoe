"use client";

import { useState } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import { GameState, INITIAL_BOARD } from "./types/game";
import styles from "./page.module.css";
import { playTurn } from "./utils/playTurn";
import ControlArea from "./components/ControlArea/ControlArea";
import GameOverArea from "./components/GameOverArea/GameOverArea";

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
    playTurn({ position, gameState, setGameState });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={gameState.gameStatus !== "playing"}
        />
        <ControlArea setGameState={setGameState} />
        <GameOverArea gameState={gameState} setGameState={setGameState} />
      </main>
    </div>
  );
}
