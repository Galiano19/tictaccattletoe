import { useGameState } from "@/app/providers/GameStateProvider";
import GameBoard from "../GameBoard/GameBoard";
import GameOverArea from "../GameOverArea/GameOverArea";
import styles from "./GameArea.module.css";
import { playTurn } from "@/app/utils/playTurn";
import ControlArea from "../ControlArea/ControlArea";

export default function GameArea() {
  const { gameState, setGameState } = useGameState();

  const handleCellClick = (position: number) => {
    playTurn({ position, gameState, setGameState });
  };

  return (
    <div className={styles.Wrapper}>
      <GameOverArea />
      <GameBoard
        onCellClick={handleCellClick}
        disabled={gameState.gameStatus !== "playing"}
      />
      <ControlArea />
    </div>
  );
}
