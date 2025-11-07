import { GameState, INITIAL_BOARD } from "@/app/types/game";
import { resetGame } from "@/app/utils/resetGame";

interface ControlAreaProps {
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function ControlArea({ setGameState }: ControlAreaProps) {
  const handleResetGame = () => {
    resetGame({ setGameState });
  };

  return (
    <div>
      <button onClick={handleResetGame}>Reset Game</button>
    </div>
  );
}
