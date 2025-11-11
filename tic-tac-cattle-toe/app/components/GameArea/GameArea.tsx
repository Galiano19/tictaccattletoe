import { useGameState } from "@/app/providers/GameStateProvider";
import GameBoard from "../GameBoard/GameBoard";
import styles from "./GameArea.module.css";
import { playTurn } from "@/lib/utils/playTurn";
import Cattle from "../Cattle/Cattle";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

export default function GameArea() {
  const { gameState, setGameState } = useGameState();

  const handleCellClick = (position: number) => {
    playTurn({ position, gameState, setGameState });
  };

  return (
    <div className={styles.wrapper}>
      <ScoreBoard />
      <GameBoard
        onCellClick={handleCellClick}
        disabled={gameState.gameStatus !== "playing"}
      />
      <Cattle />
      <WeatherInfo />
    </div>
  );
}
