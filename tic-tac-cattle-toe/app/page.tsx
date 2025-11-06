"use client";

import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import { GameState, INITIAL_BOARD, Player } from "./types/game";
import styles from "./page.module.css";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    board: INITIAL_BOARD,
    currentPlayer: "X",
    gameStatus: "playing",
    winner: null,
    winningLine: null,
  });

  const handleCellClick = (position: number) => {
    // For now, just place the current player's mark
    if (
      gameState.board[position] !== null ||
      gameState.gameStatus !== "playing"
    ) {
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[position] = gameState.currentPlayer;

    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Tic-Tac-Cattle-Toe</h1>
        <div className={styles.gameInfo}>
          <p>
            Current Player: <strong>{gameState.currentPlayer}</strong>
          </p>
          <p>
            Status: <strong>{gameState.gameStatus}</strong>
          </p>
        </div>
        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={gameState.gameStatus !== "playing"}
        />
        <div className={styles.debug}>
          <h3>Debug Info (AI-friendly format):</h3>
          <pre>{JSON.stringify(gameState, null, 2)}</pre>
        </div>
      </main>
    </div>
  );
}
