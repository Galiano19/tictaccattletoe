import { useGameState } from "@/app/providers/GameStateProvider";
import { resetGame } from "@/app/utils/resetGame";

export default function GameOverArea() {
  const { gameState, setGameState } = useGameState();

  const handleResetGame = () => {
    resetGame({ setGameState });
  };

  if (gameState.gameStatus === "over") {
    return (
      <div>
        <h2>Game Over</h2>
        {gameState.winner === "X" ? <p>You win!</p> : <p>Cattle wins!</p>}
        <button onClick={handleResetGame}>Reset Game</button>
      </div>
    );
  }

  if (gameState.gameStatus === "draw") {
    return (
      <div>
        <h2>It&apos;s a Draw!</h2>
        <p>No one wins this time.</p>
        <p>Make sure to pet the Cattle.</p>
        <button onClick={handleResetGame}>Reset Game</button>
      </div>
    );
  }
}
