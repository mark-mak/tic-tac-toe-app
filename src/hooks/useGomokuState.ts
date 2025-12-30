import { useState, useCallback, useEffect } from 'react';
import { GomokuGameState, GomokuPlayer, GomokuGameMode } from '../types/gomoku';
import { createEmptyGomokuBoard, checkGomokuWinner, checkGomokuDraw } from '../utils/gomokuLogic';
import { getGomokuAIMove } from '../utils/gomokuAI';

export const useGomokuState = () => {
  const [gameState, setGameState] = useState<GomokuGameState>({
    board: createEmptyGomokuBoard(),
    currentPlayer: 'Black',
    status: 'playing',
    winner: null,
    winningLine: null,
    mode: 'pvp',
  });

  // AI move effect
  useEffect(() => {
    if (
      gameState.mode === 'ai' &&
      gameState.currentPlayer === 'White' &&
      gameState.status === 'playing'
    ) {
      const timer = setTimeout(() => {
        const aiMove = getGomokuAIMove(gameState.board, 'White');
        if (aiMove) {
          makeMove(aiMove.row, aiMove.col);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.status, gameState.mode]);

  const makeMove = useCallback((row: number, col: number) => {
    if (gameState.board[row][col] || gameState.status !== 'playing') {
      return;
    }

    const newBoard = gameState.board.map(r => [...r]);
    newBoard[row][col] = gameState.currentPlayer;

    const { winner, line } = checkGomokuWinner(newBoard, row, col);
    
    if (winner) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'win',
        winner,
        winningLine: line,
        mode: gameState.mode,
      });
      return;
    }

    if (checkGomokuDraw(newBoard)) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'draw',
        winner: null,
        winningLine: null,
        mode: gameState.mode,
      });
      return;
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'Black' ? 'White' : 'Black',
      status: 'playing',
      winner: null,
      winningLine: null,
      mode: gameState.mode,
    });
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyGomokuBoard(),
      currentPlayer: 'Black',
      status: 'playing',
      winner: null,
      winningLine: null,
      mode: gameState.mode,
    });
  }, [gameState.mode]);

  const setGameMode = useCallback((mode: GomokuGameMode) => {
    setGameState({
      board: createEmptyGomokuBoard(),
      currentPlayer: 'Black',
      status: 'playing',
      winner: null,
      winningLine: null,
      mode,
    });
  }, []);

  return {
    gameState,
    makeMove,
    resetGame,
    setGameMode,
  };
};
