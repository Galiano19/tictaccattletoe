import { GameState } from "../types/game";

export function winningMove(
  combination: number[],
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): boolean {
  const [a, b, c] = combination;

  // Check for winning opportunity: two O's and one empty spot
  if (
    gameState.board[a] === "O" &&
    gameState.board[b] === "O" &&
    gameState.board[c] === null
  ) {
    const newBoard = [...gameState.board];
    newBoard[c] = "O";
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: "X",
    });
    return true;
  }

  if (
    gameState.board[a] === "O" &&
    gameState.board[c] === "O" &&
    gameState.board[b] === null
  ) {
    const newBoard = [...gameState.board];
    newBoard[b] = "O";
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: "X",
    });
    return true;
  }

  if (
    gameState.board[b] === "O" &&
    gameState.board[c] === "O" &&
    gameState.board[a] === null
  ) {
    const newBoard = [...gameState.board];
    newBoard[a] = "O";
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: "X",
    });
    return true;
  }

  return false; // No winning move found in this combination
}
