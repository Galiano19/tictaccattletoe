import { GameState } from "../types/game";

export function developingMove(
  combination: number[],
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): boolean {
  const [a, b, c] = combination;

  const hasOpponentPiece =
    gameState.board[a] === "X" ||
    gameState.board[b] === "X" ||
    gameState.board[c] === "X";

  if (hasOpponentPiece) {
    return false;
  }

  // Combinations with one O and two empty spots
  if (
    gameState.board[a] === "O" &&
    gameState.board[b] === null &&
    gameState.board[c] === null
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
    gameState.board[a] === null &&
    gameState.board[b] === "O" &&
    gameState.board[c] === null
  ) {
    const newBoard = [...gameState.board];
    // Choose the better strategic position (prefer corners/center)
    const preferredPosition = getPreferredPosition([a, c]);
    newBoard[preferredPosition] = "O";
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: "X",
    });
    return true;
  }

  if (
    gameState.board[a] === null &&
    gameState.board[b] === null &&
    gameState.board[c] === "O"
  ) {
    const newBoard = [...gameState.board];
    newBoard[b] = "O"; // Place next to existing O
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: "X",
    });
    return true;
  }

  // Empty combinations
  const allEmpty =
    gameState.board[a] === null &&
    gameState.board[b] === null &&
    gameState.board[c] === null;

  if (allEmpty) {
    const newBoard = [...gameState.board];
    const strategicPosition = getPreferredPosition([a, b, c]);
    newBoard[strategicPosition] = "O";
    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: "X",
    });
    return true;
  }

  return false;
}

function getPreferredPosition(positions: number[]): number {
  const center = 4;
  const corners = [0, 2, 6, 8];

  // Prefer center if available
  if (positions.includes(center)) {
    return center;
  }

  // Prefer corners over edges
  const availableCorners = positions.filter((pos) => corners.includes(pos));
  if (availableCorners.length > 0) {
    return availableCorners[0];
  }

  // Otherwise, return the first available position
  return positions[0];
}
