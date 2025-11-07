import { useGameState } from "@/app/providers/GameStateProvider";
import { resetGame } from "@/app/utils/resetGame";

export default function ControlArea() {
  const { setGameState } = useGameState();

  const handleResetGame = () => {
    resetGame({ setGameState });
  };

  return (
    <div>
      <button onClick={handleResetGame}>Reset Game</button>
    </div>
  );
}
