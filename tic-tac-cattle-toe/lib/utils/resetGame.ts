import { GameState } from "../types/game";

interface ResetGameParams {
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export function resetGame({ setGameState }: ResetGameParams) {
  setGameState((prevState) => ({
    ...prevState,
    board: [null, null, null, null, null, null, null, null, null],
    currentPlayer: "X",
    gameStatus: "playing",
    winner: null,
    winningLine: null,
  }));
}
