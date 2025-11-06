import { GameState } from "@/app/types/game";
import { developingMove } from "@/app/utils/developingMove";

describe("developingMove", () => {
  let mockSetGameState: jest.Mock;

  const createGameState = (board: ("X" | "O" | null)[]): GameState => ({
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

  describe("Priority 1: Combinations with one O and no X pieces", () => {
    it("should place O next to existing O when O is in first position", () => {
      const gameState = createGameState([
        "O",
        null,
        null, // [0, 1, 2] - O at position 0
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(true);
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: ["O", "O", null, null, null, null, null, null, null],
        currentPlayer: "X",
      });
    });

    it("should place O in preferred position when O is in middle position", () => {
      const gameState = createGameState([
        null,
        "O",
        null, // [0, 1, 2] - O at position 1
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(true);
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: ["O", "O", null, null, null, null, null, null, null], // Prefers corner (0) over edge (2)
        currentPlayer: "X",
      });
    });

    it("should place O next to existing O when O is in last position", () => {
      const gameState = createGameState([
        null,
        null,
        "O", // [0, 1, 2] - O at position 2
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(true);
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: [null, "O", "O", null, null, null, null, null, null],
        currentPlayer: "X",
      });
    });
  });

  describe("Priority 2: Empty combinations with no pieces", () => {
    it("should prefer center position in diagonal combination", () => {
      const gameState = createGameState([
        null,
        null,
        null,
        null,
        null,
        null, // [0, 4, 8] - center available
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 4, 8], gameState, mockSetGameState);

      expect(result).toBe(true);
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: [null, null, null, null, "O", null, null, null, null], // Center (4) preferred
        currentPlayer: "X",
      });
    });

    it("should prefer corner when center not available", () => {
      const gameState = createGameState([
        null,
        null,
        null,
        null,
        null,
        null, // [0, 1, 2] - corner and edge available
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(true);
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: ["O", null, null, null, null, null, null, null, null], // Corner (0) preferred over edge (1)
        currentPlayer: "X",
      });
    });

    it("should take edge position when only edges available", () => {
      const gameState = createGameState([
        null,
        null,
        null,
        null,
        null,
        null, // [1, 3, 5] - only edges available
        null,
        null,
        null,
      ]);

      const result = developingMove([1, 3, 5], gameState, mockSetGameState);

      expect(result).toBe(true);
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: [null, "O", null, null, null, null, null, null, null], // First available edge (1)
        currentPlayer: "X",
      });
    });
  });

  describe("Rejecting blocked combinations", () => {
    it("should return false when combination contains X pieces", () => {
      const gameState = createGameState([
        "X",
        null,
        null, // [0, 1, 2] - X at position 0
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(false);
      expect(mockSetGameState).not.toHaveBeenCalled();
    });

    it("should return false when combination has X in middle", () => {
      const gameState = createGameState([
        null,
        "X",
        null, // [0, 1, 2] - X at position 1
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(false);
      expect(mockSetGameState).not.toHaveBeenCalled();
    });

    it("should return false when combination has multiple X pieces", () => {
      const gameState = createGameState([
        "X",
        null,
        "X", // [0, 1, 2] - X at positions 0 and 2
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(false);
      expect(mockSetGameState).not.toHaveBeenCalled();
    });
  });

  describe("Combinations already filled with O", () => {
    it("should return false when combination already has two O pieces", () => {
      const gameState = createGameState([
        "O",
        "O",
        null, // [0, 1, 2] - already has two Os
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(false);
      expect(mockSetGameState).not.toHaveBeenCalled();
    });

    it("should return false when combination is completely filled", () => {
      const gameState = createGameState([
        "O",
        "O",
        "O", // [0, 1, 2] - completely filled
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(false);
      expect(mockSetGameState).not.toHaveBeenCalled();
    });
  });

  describe("Strategic positioning", () => {
    it("should prefer corner over edge when both available", () => {
      const gameState = createGameState([
        null,
        "O",
        null, // [0, 1, 2] - corner (0,2) and edge (1) available, O at 1
        null,
        null,
        null,
        null,
        null,
        null,
      ]);

      const result = developingMove([0, 1, 2], gameState, mockSetGameState);

      expect(result).toBe(true);
      // Should prefer corner (0) over corner (2) as it's first in the list
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: ["O", "O", null, null, null, null, null, null, null],
        currentPlayer: "X",
      });
    });

    it("should handle center diagonal combination correctly", () => {
      const gameState = createGameState([
        null,
        null,
        null,
        null,
        "O",
        null, // [2, 4, 6] - O at center (4)
        null,
        null,
        null,
      ]);

      const result = developingMove([2, 4, 6], gameState, mockSetGameState);

      expect(result).toBe(true);
      // Should place at corner (2) as it's preferred over corner (6)
      expect(mockSetGameState).toHaveBeenCalledWith({
        ...gameState,
        board: [null, null, "O", null, "O", null, null, null, null],
        currentPlayer: "X",
      });
    });
  });
});
