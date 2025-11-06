import { blockingMove } from "../../app/utils/blockingMove";
import { GameState, WINNING_COMBINATIONS } from "../../app/types/game";

describe("blockingMove", () => {
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

  it("should block when X has two in positions 0,1 and position 2 is empty", () => {
    const gameState = createGameState({
      board: ["X", "X", null, null, null, null, null, null, null],
      currentPlayer: "O",
    });

    blockingMove([0, 1, 2], gameState, mockSetGameState);

    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      board: ["X", "X", "O", null, null, null, null, null, null],
      currentPlayer: "X",
    });
  });

  it("should block when X has a winning move after checking all combinations", () => {
    const gameState = createGameState({
      board: [null, "X", "X", "X", null, null, "X", null, null],
      currentPlayer: "O",
    });
    WINNING_COMBINATIONS.forEach((combination) => {
      blockingMove(combination, gameState, mockSetGameState);
    });

    expect(mockSetGameState).toHaveBeenCalledWith({
      ...gameState,
      board: [null, "X", "X", "X", "O", null, "X", null, null],
      currentPlayer: "X",
    });
  });
});
