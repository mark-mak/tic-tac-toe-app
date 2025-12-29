import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameState } from '../hooks/useGameState';
import { Board, GameStatusDisplay, Button } from '../components';
import { APP_VERSION } from '../utils/version';

export const GameScreen: React.FC = () => {
  const { gameState, makeMove, resetGame } = useGameState();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Tic-Tac-Toe
        </Text>
        
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
        
        <Text style={styles.version}>v{APP_VERSION}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 32,
  },
  version: {
    marginTop: 24,
    fontSize: 14,
    color: '#9CA3AF',
  },
});
