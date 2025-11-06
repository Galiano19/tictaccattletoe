import { GameState } from "../types/game";

export function blockingMove(
  combination: number[],
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): boolean {
  const [a, b, c] = combination;

  // Check for blocking opportunity: two X's and one empty spot
  if (
    gameState.board[a] === "X" &&
    gameState.board[b] === "X" &&
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
    gameState.board[a] === "X" &&
    gameState.board[c] === "X" &&
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
    gameState.board[b] === "X" &&
    gameState.board[c] === "X" &&
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

  return false; // No blocking move needed in this combination
}
