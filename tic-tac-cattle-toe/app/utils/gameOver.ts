import {
  BoardState,
  GameState,
  Player,
  WINNING_COMBINATIONS,
} from "../types/game";

interface SetGameOverParams {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

interface GameOverResult {
  gameOver: boolean;
  winner?: Player | null;
  winningLine?: number[] | null;
}

export function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

export function isGameOver(gameState: GameState): GameOverResult {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      gameState.board[a] &&
      gameState.board[a] === gameState.board[b] &&
      gameState.board[a] === gameState.board[c]
    ) {
      return {
        gameOver: true,
        winner: gameState.board[a],
        winningLine: combination,
      };
    }
  }
  return {
    gameOver: false,
  };
}

export function setGameOver({ gameState, setGameState }: SetGameOverParams) {
  setGameState({
    ...gameState,
    gameStatus: "over",
    winner: gameState.winner,
    winningLine: gameState.winningLine,
  });
}

export function setDraw(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  setGameState({
    ...gameState,
    gameStatus: "draw",
  });
}

export function checkGameCompletion(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): boolean {
  // First check for a win
  const gameResult = isGameOver(gameState);

  if (gameResult.gameOver) {
    setGameState({
      ...gameState,
      gameStatus: "over",
      winner: gameResult.winner || null,
      winningLine: gameResult.winningLine || null,
    });
    return true;
  }

  // If no win, check for draw
  if (isBoardFull(gameState.board)) {
    setDraw(gameState, setGameState);
    return true;
  }

  // Game continues
  return false;
}
