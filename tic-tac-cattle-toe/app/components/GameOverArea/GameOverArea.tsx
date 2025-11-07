import { GameState } from "@/app/types/game";
import { resetGame } from "@/app/utils/resetGame";

interface GameOverAreaProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function GameOverArea({
  gameState,
  setGameState,
}: GameOverAreaProps) {
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
        <h2>It's a Draw!</h2>
        <p>No one wins this time.</p>
        <p>Make sure to pet the Cattle.</p>
        <button onClick={handleResetGame}>Reset Game</button>
      </div>
    );
  }
}
