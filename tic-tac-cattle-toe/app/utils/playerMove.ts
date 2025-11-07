import { GameState } from "../types/game";
import { checkGameCompletion } from "./gameOver";

export function playerMove(
  position: number,
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const newBoard = [...gameState.board];
  newBoard[position] = "X";

  if (checkGameCompletion(gameState, setGameState)) {
    return;
  }

  setGameState({
    ...gameState,
    board: newBoard,
    currentPlayer: "O",
  });
}
