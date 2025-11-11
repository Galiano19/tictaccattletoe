import { GameState } from "../types/game";

export function playerMove(
  position: number,
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const newBoard = [...gameState.board];
  newBoard[position] = "X";

  setGameState({
    ...gameState,
    board: newBoard,
    currentPlayer: "O",
  });
}
