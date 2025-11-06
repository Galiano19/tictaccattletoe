"use client";

import { CellValue } from "../types/game";
import styles from "./GameBoard.module.css";

interface GameBoardProps {
  board: CellValue[];
  onCellClick: (position: number) => void;
  disabled?: boolean;
}

export default function GameBoard({
  board,
  onCellClick,
  disabled = false,
}: GameBoardProps) {
  return (
    <div className={styles.gameBoard}>
      {board.map((cell, index) => (
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
