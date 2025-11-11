import { BoardState, GameState, WINNING_COMBINATIONS } from "@/lib/types/game";
import { winningMove } from "@/lib/utils/winningMove";

describe("winningMove", () => {
  let mockSetGameState: jest.Mock;
  const createGameState = (board: BoardState): GameState => ({
    board,
    currentPlayer: "O",
    gameStatus: "playing",
    winner: null,
    winningLine: null,
    difficulty: "easy",
  });

  beforeEach(() => {
    mockSetGameState = jest.fn();
  });

  it("should place O in third position when first two positions have O", () => {
    const gameState = createGameState([
      "O",
      "O",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
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
    const gameState = createGameState([
      "O",
      null,
      "O",
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
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
    const gameState = createGameState([
      null,
      "O",
      "O",
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
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
    const gameState = createGameState([
      null,
      "X",
      null,
      "X",
      "O",
      null,
      "O",
      null,
      null,
    ]);
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
