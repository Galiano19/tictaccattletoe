import { BoardState, GameState, Player } from "@/lib/types/game";
import {
  checkGameCompletion,
  isBoardFull,
  isGameOver,
  setDraw,
  setGameOver,
} from "@/lib/utils/gameOver";

describe("isGameOver", () => {
  const createGameState = (board: BoardState): GameState => ({
    board,
    currentPlayer: "O",
    gameStatus: "playing",
    winner: null,
    winningLine: null,
    difficulty: "easy",
  });

  it("should return true for a winning combination", () => {
    const gameState = createGameState([
      "X",
      "X",
      "X",
      null,
      "O",
      "O",
      null,
      null,
      null,
    ]);
    expect(isGameOver(gameState)).toMatchObject({
      gameOver: true,
      winner: "X",
      winningLine: [0, 1, 2],
    });
  });

  it("should return false for a non-winning combination", () => {
    const gameState = createGameState([
      "X",
      "O",
      "X",
      "O",
      "X",
      "O",
      null,
      null,
      null,
    ]);
    expect(isGameOver(gameState)).toMatchObject({
      gameOver: false,
    });
  });
});

describe("setGameOver", () => {
  let mockSetGameState: jest.Mock;

  const createGameState = ({
    board,
    winner,
    winningLine,
  }: {
    board: BoardState;
    winner: Player | null;
    winningLine: number[] | null;
  }): GameState => ({
    board,
    currentPlayer: "O",
    gameStatus: "playing",
    winner,
    winningLine,
    difficulty: "easy",
  });

  beforeEach(() => {
    mockSetGameState = jest.fn();
  });

  it("should set game over state for a winning combination, setting winner and winning line", () => {
    const gameState = createGameState({
      board: ["X", "X", "X", null, "O", "O", null, null, null],
      winner: "X",
      winningLine: [0, 1, 2],
    });

    setGameOver({ gameState: gameState, setGameState: mockSetGameState });
    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      gameStatus: "over",
      winner: "X",
      winningLine: [0, 1, 2],
    });
  });
});
describe("isBoardFull", () => {
  it("should return true when board is completely filled", () => {
    const board: BoardState = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    expect(isBoardFull(board)).toBe(true);
  });

  it("should return false when board has empty cells", () => {
    const board: BoardState = ["X", "O", "X", null, "X", "O", "X", "O", "X"];
    expect(isBoardFull(board)).toBe(false);
  });

  it("should return false when board is empty", () => {
    const board: BoardState = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    expect(isBoardFull(board)).toBe(false);
  });
});

describe("setDraw", () => {
  let mockSetGameState: jest.Mock;

  beforeEach(() => {
    mockSetGameState = jest.fn();
  });

  it("should set game status to draw", () => {
    const gameState: GameState = {
      board: ["X", "O", "X", "O", "X", "O", "X", "O", "X"],
      currentPlayer: "X",
      gameStatus: "playing",
      winner: null,
      winningLine: null,
      difficulty: "easy",
    };

    setDraw(gameState, mockSetGameState);
    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      gameStatus: "draw",
    });
  });
});

describe("checkGameCompletion", () => {
  let mockSetGameState: jest.Mock;

  beforeEach(() => {
    mockSetGameState = jest.fn();
  });

  it("should return true and set game over when there is a winner", () => {
    const gameState: GameState = {
      board: ["X", "X", "X", null, "O", "O", null, null, null],
      currentPlayer: "O",
      gameStatus: "playing",
      winner: null,
      winningLine: null,
      difficulty: "easy",
    };

    const result = checkGameCompletion(gameState, mockSetGameState);
    expect(result).toBe(true);
    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      gameStatus: "over",
      winner: "X",
      winningLine: [0, 1, 2],
    });
  });

  it("should return true and set draw when board is full with no winner", () => {
    const gameState: GameState = {
      board: ["X", "O", "X", "O", "X", "O", "O", "X", "O"],
      currentPlayer: "X",
      gameStatus: "playing",
      winner: null,
      winningLine: null,
      difficulty: "easy",
    };

    const result = checkGameCompletion(gameState, mockSetGameState);
    expect(result).toBe(true);
    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      gameStatus: "draw",
    });
  });

  it("should return false when game continues", () => {
    const gameState: GameState = {
      board: ["X", "O", "X", null, "X", "O", null, null, null],
      currentPlayer: "O",
      gameStatus: "playing",
      winner: null,
      winningLine: null,
      difficulty: "easy",
    };

    const result = checkGameCompletion(gameState, mockSetGameState);
    expect(result).toBe(false);
    expect(mockSetGameState).not.toHaveBeenCalled();
  });
});
