"use client";

import { useGameState } from "@/app/providers/GameStateProvider";
import styles from "./GameBoard.module.css";

interface GameBoardProps {
  onCellClick: (position: number) => void;
  disabled?: boolean;
}

export default function GameBoard({
  onCellClick,
  disabled = false,
}: GameBoardProps) {
  const { gameState } = useGameState();

  return (
    <div className={styles.wrapper}>
      {gameState.board.map((cell, index) => (
        <button
          key={index}
          className={styles.cell}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
        >
          {cell && <span className={styles.cellValue}>{cell}</span>}
        </button>
      ))}
    </div>
  );
}
