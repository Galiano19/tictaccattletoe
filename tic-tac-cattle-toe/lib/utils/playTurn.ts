import { GameState } from "../types/game";
import { opponentMove } from "./opponentMove";
import { playerMove } from "./playerMove";
import { checkGameCompletion } from "./gameOver";

interface PlayTurnParams {
  position: number;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export function playTurn({
  position,
  gameState,
  setGameState,
}: PlayTurnParams) {
  playerMove(position, gameState, setGameState);

  // Delay opponent move to ensure state is updated
  setTimeout(() => {
    setGameState((currentState) => {
      const gameEnded = checkGameCompletion(currentState, setGameState);

      if (gameEnded) {
        return currentState;
      }

      if (
        currentState.currentPlayer === "O" &&
        currentState.gameStatus === "playing"
      ) {
        opponentMove(currentState, setGameState);
      }

      return currentState;
    });
  }, 100);
}
