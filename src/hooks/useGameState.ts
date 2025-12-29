import { useState, useCallback } from 'react';
import { GameState, Player } from '../types/game';
import { checkWinner, checkDraw, createEmptyBoard } from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    winningLine: null,
  });

  const makeMove = useCallback((index: number) => {
    if (gameState.board[index] || gameState.status !== 'playing') {
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, line } = checkWinner(newBoard);
    
    if (winner) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'win',
        winner,
        winningLine: line,
      });
      return;
    }

    if (checkDraw(newBoard)) {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: 'draw',
        winner: null,
        winningLine: null,
      });
      return;
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      status: 'playing',
      winner: null,
      winningLine: null,
    });
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      winningLine: null,
    });
  }, []);

  return {
    gameState,
    makeMove,
    resetGame,
  };
};
