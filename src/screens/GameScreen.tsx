import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameState } from '../hooks/useGameState';
import { Board, Button, GameStatusDisplay, ModeSelector } from '../components';
import { TicTacToeScreenProps } from '../types/navigation';
import { useAppStore } from '../store/useAppStore';

export const GameScreen: React.FC<TicTacToeScreenProps> = ({ navigation }) => {
  const { gameState, makeMove, resetGame, setGameMode } = useGameState();
  const { incrementGamesPlayed, isDarkMode } = useAppStore();

  useEffect(() => {
    // Increment counter when game ends
    if (gameState.status !== 'playing') {
      incrementGamesPlayed();
    }
  }, [gameState.status]);

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, isDarkMode && styles.darkAccent]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Tic-Tac-Toe</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <ModeSelector
          currentMode={gameState.mode}
          onModeChange={setGameMode}
        />
        
        <GameStatusDisplay
          status={gameState.status}
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
        />
        
        <Board
          board={gameState.board}
          onCellPress={makeMove}
          winningLine={gameState.winningLine}
        />

        <Button onPress={resetGame} title="New Game" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  darkContainer: {
    backgroundColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
  },
  darkAccent: {
    color: '#818CF8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  darkText: {
    color: '#F9FAFB',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
