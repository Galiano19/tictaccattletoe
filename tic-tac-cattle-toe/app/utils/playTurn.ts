import { GameState } from "../types/game";
import { opponentMove } from "./opponentMove";
import { playerMove } from "./playerMove";

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

  // Delay opponent move to allow React to re-render with player's move first
  setTimeout(() => {
    setGameState((currentState) => {
      if (
        currentState.currentPlayer === "O" &&
        currentState.gameStatus === "playing"
      ) {
        opponentMove(currentState, setGameState);
      }
      return currentState;
    });
  }, 500);
}
