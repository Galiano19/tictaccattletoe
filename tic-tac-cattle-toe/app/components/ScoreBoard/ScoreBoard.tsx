import { useGameStats } from "@/app/hooks/useGameStats";
import { useGameState } from "@/app/providers/GameStateProvider";
import { useEffect, useRef } from "react";
import styles from "./ScoreBoard.module.css";
import { resetGame } from "@/app/utils/resetGame";

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
    <div className={styles.Wrapper}>
      <div
        className={`${styles.Stat} ${
          gameState.winner === "X" ? styles.Win : ""
        }`}
      >
        <div className={styles.Label}>Wins</div>
        <div className={styles.Value}>{wins}</div>
      </div>
      <div
        className={`${styles.Stat} ${
          gameState.winner === "O" ? styles.Lose : ""
        }`}
      >
        <div className={styles.Label}>Losses</div>
        <div className={styles.Value}>{losses}</div>
      </div>
      <div
        className={`${styles.Stat} ${
          gameState.gameStatus === "draw" ? styles.Draw : ""
        }`}
      >
        <div className={styles.Label}>Draws</div>
        <div className={styles.Value}>{draws}</div>
      </div>
      <button className={styles.ResetBtn} onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
}
