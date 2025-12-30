import { GomokuBoard, GomokuPlayer } from '../types/gomoku';

const BOARD_SIZE = 15;
const WIN_LENGTH = 5;

export const createEmptyGomokuBoard = (): GomokuBoard => {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
};

export const checkGomokuWinner = (
  board: GomokuBoard,
  lastRow: number,
  lastCol: number
): { winner: GomokuPlayer | null; line: { row: number; col: number }[] | null } => {
  const player = board[lastRow][lastCol];
  if (!player) return { winner: null, line: null };

  // Directions: horizontal, vertical, diagonal (\), diagonal (/)
  const directions = [
    { dr: 0, dc: 1 },  // horizontal
    { dr: 1, dc: 0 },  // vertical
    { dr: 1, dc: 1 },  // diagonal \
    { dr: 1, dc: -1 }, // diagonal /
  ];

  for (const { dr, dc } of directions) {
    const line: { row: number; col: number }[] = [];
    let count = 1;

    // Check positive direction
    for (let i = 1; i < WIN_LENGTH; i++) {
      const r = lastRow + dr * i;
      const c = lastCol + dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) {
        break;
      }
      count++;
      line.push({ row: r, col: c });
    }

    // Check negative direction
    for (let i = 1; i < WIN_LENGTH; i++) {
      const r = lastRow - dr * i;
      const c = lastCol - dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE || board[r][c] !== player) {
        break;
      }
      count++;
      line.push({ row: r, col: c });
    }

    if (count >= WIN_LENGTH) {
      line.push({ row: lastRow, col: lastCol });
      return { winner: player, line };
    }
  }

  return { winner: null, line: null };
};

export const checkGomokuDraw = (board: GomokuBoard): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const GOMOKU_BOARD_SIZE = BOARD_SIZE;
