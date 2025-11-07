import { GameState, WINNING_COMBINATIONS } from "../types/game";
import { blockingMove } from "./blockingMove";
import { developingMove } from "./developingMove";
import { winningMove } from "./winningMove";

export function opponentMove(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const availablePositions = gameState.board
    .map((cell, index) => (cell === null ? index : null))
    .filter((pos): pos is number => pos !== null);

  if (availablePositions.length === 0) {
    return;
  }

  // Check for winning moves
  for (const combination of WINNING_COMBINATIONS) {
    const winAttempted = winningMove(combination, gameState, setGameState);
    if (winAttempted) {
      return;
    }
  }

  // Check for blocking moves (prevent player from winning)
  for (const combination of WINNING_COMBINATIONS) {
    const blockAttempted = blockingMove(combination, gameState, setGameState);
    if (blockAttempted) {
      return;
    }
  }

  // Check for developing moves
  for (const combination of WINNING_COMBINATIONS) {
    const developAttempted = developingMove(
      combination,
      gameState,
      setGameState
    );
    if (developAttempted) {
      return;
    }
  }

  // If no strategic move found, pick a random available position
  randomMove(availablePositions, gameState, setGameState);
}

export function randomMove(
  availablePositions: number[],
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const randomIndex = Math.floor(Math.random() * availablePositions.length);
  const position = availablePositions[randomIndex];
  const newBoard = [...gameState.board];
  newBoard[position] = "O";
  setGameState({
    ...gameState,
    board: newBoard,
    currentPlayer: "X",
  });
}
