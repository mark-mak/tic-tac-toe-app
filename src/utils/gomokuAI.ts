import { GomokuBoard, GomokuPlayer } from '../types/gomoku';
import { GOMOKU_BOARD_SIZE } from './gomokuLogic';

// Simplified Gomoku AI - uses pattern matching for faster performance
// Full minimax would be too slow for 15x15 board

interface Position {
  row: number;
  col: number;
  score: number;
}

const DIRECTIONS = [
  { dr: 0, dc: 1 },  // horizontal
  { dr: 1, dc: 0 },  // vertical
  { dr: 1, dc: 1 },  // diagonal \
  { dr: 1, dc: -1 }, // diagonal /
];

// Improved line pattern evaluation with better pattern recognition
const evaluateLine = (
  board: GomokuBoard,
  row: number,
  col: number,
  dr: number,
  dc: number,
  player: GomokuPlayer
): number => {
  let count = 0;
  let openEnds = 0;
  let spaces = 0;

  // Check forward direction (up to 5 cells)
  for (let i = 0; i < 5; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (r < 0 || r >= GOMOKU_BOARD_SIZE || c < 0 || c >= GOMOKU_BOARD_SIZE) {
      break;
    }
    if (board[r][c] === player) {
      count++;
    } else if (board[r][c] === null) {
      if (i === count) {
        openEnds++;
      }
      spaces++;
      break;
    } else {
      break;
    }
  }

  // Check backward direction
  for (let i = 1; i < 5; i++) {
    const r = row - dr * i;
    const c = col - dc * i;
    if (r < 0 || r >= GOMOKU_BOARD_SIZE || c < 0 || c >= GOMOKU_BOARD_SIZE) {
      break;
    }
    if (board[r][c] === player) {
      count++;
    } else if (board[r][c] === null) {
      openEnds++;
      spaces++;
      break;
    } else {
      break;
    }
  }

  // Enhanced scoring with pattern recognition
  if (count >= 5) return 100000; // Win
  if (count === 4) {
    if (openEnds === 2) return 50000; // Open four (guaranteed win)
    if (openEnds === 1) return 10000; // Four in a row (must block)
  }
  if (count === 3) {
    if (openEnds === 2) return 5000; // Open three (strong threat)
    if (openEnds === 1) return 1000; // Half-open three
  }
  if (count === 2) {
    if (openEnds === 2) return 500; // Open two
    if (openEnds === 1) return 100; // Half-open two
  }
  if (count === 1 && openEnds > 0) return 10;

  return 0;
};

// Evaluate position for a player
const evaluatePosition = (
  board: GomokuBoard,
  row: number,
  col: number,
  player: GomokuPlayer
): number => {
  let score = 0;

  for (const { dr, dc } of DIRECTIONS) {
    score += evaluateLine(board, row, col, dr, dc, player);
    score += evaluateLine(board, row, col, -dr, -dc, player);
  }

  return score;
};

// Get all empty positions near existing stones
const getCandidatePositions = (board: GomokuBoard): Position[] => {
  const positions: Position[] = [];
  const checked = new Set<string>();

  // Look for empty cells adjacent to existing stones
  for (let row = 0; row < GOMOKU_BOARD_SIZE; row++) {
    for (let col = 0; col < GOMOKU_BOARD_SIZE; col++) {
      if (board[row][col] !== null) {
        // Check surrounding cells
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const r = row + dr;
            const c = col + dc;
            const key = `${r},${c}`;
            
            if (
              r >= 0 && r < GOMOKU_BOARD_SIZE &&
              c >= 0 && c < GOMOKU_BOARD_SIZE &&
              board[r][c] === null &&
              !checked.has(key)
            ) {
              checked.add(key);
              positions.push({ row: r, col: c, score: 0 });
            }
          }
        }
      }
    }
  }

  // If board is empty, start in center
  if (positions.length === 0) {
    const center = Math.floor(GOMOKU_BOARD_SIZE / 2);
    positions.push({ row: center, col: center, score: 0 });
  }

  return positions;
};

export const getGomokuAIMove = (board: GomokuBoard, aiPlayer: GomokuPlayer): { row: number; col: number } | null => {
  const opponent: GomokuPlayer = aiPlayer === 'Black' ? 'White' : 'Black';
  const candidates = getCandidatePositions(board);

  if (candidates.length === 0) return null;

  // Check for immediate winning move
  let bestWinningMove: Position | null = null;
  let bestWinningScore = 0;

  // Check for immediate blocking move
  let bestBlockingMove: Position | null = null;
  let bestBlockingScore = 0;

  // Score each candidate position with strategic depth
  for (const pos of candidates) {
    // Temporarily place AI piece and evaluate
    board[pos.row][pos.col] = aiPlayer;
    const aiScore = evaluatePosition(board, pos.row, pos.col, aiPlayer);
    board[pos.row][pos.col] = null;

    // Check if this is a winning move
    if (aiScore >= 100000) {
      return { row: pos.row, col: pos.col };
    }
    if (aiScore > bestWinningScore) {
      bestWinningScore = aiScore;
      bestWinningMove = pos;
    }

    // Temporarily place opponent piece and evaluate blocking
    board[pos.row][pos.col] = opponent;
    const opponentScore = evaluatePosition(board, pos.row, pos.col, opponent);
    board[pos.row][pos.col] = null;

    // Check if opponent would win here (must block)
    if (opponentScore >= 100000) {
      return { row: pos.row, col: pos.col };
    }
    if (opponentScore > bestBlockingScore) {
      bestBlockingScore = opponentScore;
      bestBlockingMove = pos;
    }

    // Combined scoring: prioritize attack but consider defense
    pos.score = aiScore * 1.3 + opponentScore * 1.1;

    // Bonus for center control (early game)
    const centerDist = Math.abs(pos.row - 7) + Math.abs(pos.col - 7);
    pos.score += (14 - centerDist) * 5;
  }

  // Prioritize critical moves
  if (bestBlockingScore >= 10000) {
    // Must block opponent's four-in-a-row
    return { row: bestBlockingMove!.row, col: bestBlockingMove!.col };
  }
  if (bestWinningScore >= 5000) {
    // Strong offensive move (open three)
    return { row: bestWinningMove!.row, col: bestWinningMove!.col };
  }

  // Sort by combined score and get best move
  candidates.sort((a, b) => b.score - a.score);
  
  return { row: candidates[0].row, col: candidates[0].col };
};
