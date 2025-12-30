export type GomokuPlayer = 'Black' | 'White';
export type GomokuCellValue = GomokuPlayer | null;
export type GomokuBoard = GomokuCellValue[][];
export type GomokuStatus = 'playing' | 'win' | 'draw';
export type GomokuGameMode = 'pvp' | 'ai';

export interface GomokuGameState {
  board: GomokuBoard;
  currentPlayer: GomokuPlayer;
  status: GomokuStatus;
  winner: GomokuPlayer | null;
  winningLine: { row: number; col: number }[] | null;
  mode: GomokuGameMode;
}
