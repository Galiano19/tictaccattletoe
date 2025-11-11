import { useGameStats } from "@/app/hooks/useGameStats";
import { useGameState } from "@/app/providers/GameStateProvider";
import { useEffect, useRef } from "react";
import styles from "./ScoreBoard.module.css";
import { resetGame } from "@/lib/utils/resetGame";

export default function ScoreBoard() {
  const { wins, losses, draws, updateStats } = useGameStats();
  const { gameState, setGameState } = useGameState();
  const hasUpdatedStats = useRef(false);

  const handleResetGame = () => {
    resetGame({ setGameState });
  };

  useEffect(() => {
    if (
      (gameState.gameStatus === "over" || gameState.gameStatus === "draw") &&
      !hasUpdatedStats.current
    ) {
      if (gameState.gameStatus === "draw") {
        updateStats("draw");
      } else if (gameState.winner === "X") {
        updateStats("win");
      } else if (gameState.winner === "O") {
        updateStats("loss");
      }
      hasUpdatedStats.current = true;
    } else if (gameState.gameStatus === "playing") {
      hasUpdatedStats.current = false;
    }
  }, [gameState, updateStats]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.stat} ${
          gameState.winner === "X" ? styles.win : ""
        }`}
      >
        <div className={styles.label}>Wins</div>
        <div className={styles.value}>{wins}</div>
      </div>
      <div
        className={`${styles.stat} ${
          gameState.winner === "O" ? styles.lose : ""
        }`}
      >
        <div className={styles.label}>Losses</div>
        <div className={styles.value}>{losses}</div>
      </div>
      <div
        className={`${styles.stat} ${
          gameState.gameStatus === "draw" ? styles.draw : ""
        }`}
      >
        <div className={styles.label}>Draws</div>
        <div className={styles.value}>{draws}</div>
      </div>
      <button className={styles.resetBtn} onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
}
