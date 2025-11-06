// Types for the Tic-Tac-Toe game optimized for AI understanding

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

// AI-friendly board representation: 0-8 positions in a flat array
// Board positions:
// 0 | 1 | 2
// ---------
// 3 | 4 | 5
// ---------
// 6 | 7 | 8

export interface GameState {
  board: BoardState;
  currentPlayer: Player;
  gameStatus: 'playing' | 'won' | 'draw';
  winner: Player | null;
  winningLine: number[] | null; // positions that form the winning line
}

export interface Move {
  position: number; // 0-8
  player: Player;
}

// AI helper types
export interface BoardAnalysis {
  availableMoves: number[];
  winningMoves: { [key in Player]: number[] };
  blockingMoves: { [key in Player]: number[] };
  centerMove: number | null;
  cornerMoves: number[];
  edgeMoves: number[];
}

// Winning combinations in our flat array representation
export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // center column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export const INITIAL_BOARD: BoardState = Array(9).fill(null);