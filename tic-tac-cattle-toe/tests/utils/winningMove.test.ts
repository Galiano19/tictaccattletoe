import { GameState, WINNING_COMBINATIONS } from "@/app/types/game";
import { winningMove } from "@/app/utils/winningMove";

describe("winningMove", () => {
  let mockSetGameState: jest.Mock;
  const createGameState = (overrides: Partial<GameState> = {}): GameState => ({
    board: Array(9).fill(null),
    currentPlayer: "O",
    gameStatus: "playing",
    winner: null,
    winningLine: null,
    difficulty: "easy",
    ...overrides,
  });

  beforeEach(() => {
    mockSetGameState = jest.fn();
  });

  it("should place O in third position when first two positions have O", () => {
    const gameState = createGameState({
      board: ["O", "O", null, null, null, null, null, null, null],
      currentPlayer: "O",
    });
    WINNING_COMBINATIONS.forEach((combination) => {
      winningMove(combination, gameState, mockSetGameState);
    });

    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      board: ["O", "O", "O", null, null, null, null, null, null],
      currentPlayer: "X",
    });
  });

  it("should place O in second position when first and third positions have O", () => {
    const gameState = createGameState({
      board: ["O", null, "O", null, null, null, null, null, null],
      currentPlayer: "O",
    });
    WINNING_COMBINATIONS.forEach((combination) => {
      winningMove(combination, gameState, mockSetGameState);
    });

    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      board: ["O", "O", "O", null, null, null, null, null, null],
      currentPlayer: "X",
    });
  });

  it("should place O in first position when second and third positions have O", () => {
    const gameState = createGameState({
      board: [null, "O", "O", null, null, null, null, null, null],
      currentPlayer: "O",
    });
    WINNING_COMBINATIONS.forEach((combination) => {
      winningMove(combination, gameState, mockSetGameState);
    });

    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      board: ["O", "O", "O", null, null, null, null, null, null],
      currentPlayer: "X",
    });
  });

  it("should make a winning move after checking all combinations", () => {
    const gameState = createGameState({
      board: [null, "X", null, "X", "O", null, "O", null, null],
      currentPlayer: "O",
    });
    WINNING_COMBINATIONS.forEach((combination) => {
      winningMove(combination, gameState, mockSetGameState);
    });

    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      board: [null, "X", "O", "X", "O", null, "O", null, null],
      currentPlayer: "X",
    });
  });
});
