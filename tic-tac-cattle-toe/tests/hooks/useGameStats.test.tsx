import { renderHook, act } from "@testing-library/react";
import { useGameStats } from "../../app/hooks/useGameStats";

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("useGameStats", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe("Initial state", () => {
    it("should return initial stats when localStorage is empty or does not exists", () => {
      const { result } = renderHook(() => useGameStats());

      expect(result.current.wins).toBe(0);
      expect(result.current.losses).toBe(0);
      expect(result.current.draws).toBe(0);
      expect(typeof result.current.updateStats).toBe("function");
      expect(typeof result.current.resetStats).toBe("function");
    });

    it("should load stats from localStorage on mount", () => {
      const savedStats = { wins: 5, losses: 3, draws: 2 };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedStats));

      const { result } = renderHook(() => useGameStats());

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        "tic-tac-cattle-toe-stats"
      );
      expect(result.current.wins).toBe(5);
      expect(result.current.losses).toBe(3);
      expect(result.current.draws).toBe(2);
    });

    it("should handle partial data from localStorage", () => {
      const partialStats = { wins: 10 };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(partialStats));

      const { result } = renderHook(() => useGameStats());

      expect(result.current.wins).toBe(10);
      expect(result.current.losses).toBe(0);
      expect(result.current.draws).toBe(0);
    });
  });

  describe("updateStats functionality", () => {
    it("should correctly update wins", () => {
      const { result } = renderHook(() => useGameStats());

      act(() => {
        result.current.updateStats("win");
      });

      expect(result.current.wins).toBe(1);
      expect(result.current.losses).toBe(0);
      expect(result.current.draws).toBe(0);
    });

    it("should correctly update losses", () => {
      const { result } = renderHook(() => useGameStats());

      act(() => {
        result.current.updateStats("loss");
      });

      expect(result.current.wins).toBe(0);
      expect(result.current.losses).toBe(1);
      expect(result.current.draws).toBe(0);
    });
    it("should correctly update draws", () => {
      const { result } = renderHook(() => useGameStats());
      act(() => {
        result.current.updateStats("draw");
      });

      expect(result.current.wins).toBe(0);
      expect(result.current.losses).toBe(0);
      expect(result.current.draws).toBe(1);
    });
  });

  describe("resetStats functionality", () => {
    it("should reset all stats to zero", () => {
      const savedStats = { wins: 5, losses: 3, draws: 2 };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedStats));

      const { result } = renderHook(() => useGameStats());

      act(() => {
        result.current.resetStats();
      });

      expect(result.current.wins).toBe(0);
      expect(result.current.losses).toBe(0);
      expect(result.current.draws).toBe(0);
    });
  });

  describe("SSR compatibility", () => {
    it("should handle server-side rendering (no window object)", () => {
      const originalWindow = global.window;
      // @ts-expect-error - Intentionally deleting window for SSR test
      delete global.window;

      const { result } = renderHook(() => useGameStats());

      expect(result.current.wins).toBe(0);
      expect(result.current.losses).toBe(0);
      expect(result.current.draws).toBe(0);

      global.window = originalWindow;
    });
  });
});
