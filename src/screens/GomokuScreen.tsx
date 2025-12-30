import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGomokuState } from '../hooks/useGomokuState';
import { GomokuBoard } from '../components/GomokuBoard';
import { Button } from '../components/Button';
import { GomokuScreenProps } from '../types/navigation';
import { useAppStore } from '../store/useAppStore';

export const GomokuScreen: React.FC<GomokuScreenProps> = ({ navigation }) => {
  const { gameState, makeMove, resetGame, setGameMode } = useGomokuState();
  const { incrementGamesPlayed, isDarkMode } = useAppStore();

  useEffect(() => {
    // Increment counter when game ends
    if (gameState.status !== 'playing') {
      incrementGamesPlayed();
    }
  }, [gameState.status]);

  const getStatusText = () => {
    if (gameState.status === 'win' && gameState.winner) {
      return `${gameState.winner} Wins! 🎉`;
    }
    if (gameState.status === 'draw') {
      return "It's a Draw! 🤝";
    }
    return `Current: ${gameState.currentPlayer}`;
  };

  const getStatusColor = () => {
    if (gameState.status === 'win') return styles.winText;
    if (gameState.status === 'draw') return styles.drawText;
    return gameState.currentPlayer === 'Black' ? styles.blackText : styles.whiteText;
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, isDarkMode && styles.darkAccent]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Gomoku</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              gameState.mode === 'pvp' && styles.modeButtonActive,
              isDarkMode && styles.darkModeButton,
              gameState.mode === 'pvp' && isDarkMode && styles.darkModeButtonActive,
            ]}
            onPress={() => setGameMode('pvp')}
          >
            <Text style={[
              styles.modeButtonText,
              gameState.mode === 'pvp' && styles.modeButtonTextActive,
              isDarkMode && styles.darkText,
            ]}>
              Player vs Player
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              gameState.mode === 'ai' && styles.modeButtonActive,
              isDarkMode && styles.darkModeButton,
              gameState.mode === 'ai' && isDarkMode && styles.darkModeButtonActive,
            ]}
            onPress={() => setGameMode('ai')}
          >
            <Text style={[
              styles.modeButtonText,
              gameState.mode === 'ai' && styles.modeButtonTextActive,
              isDarkMode && styles.darkText,
            ]}>
              Player vs AI
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, getStatusColor(), isDarkMode && styles.darkText]}>
            {getStatusText()}
          </Text>
        </View>

        <GomokuBoard
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
    paddingHorizontal: 16,
  },
  modeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  darkModeButton: {
    backgroundColor: '#374151',
  },
  modeButtonActive: {
    backgroundColor: '#4F46E5',
  },
  darkModeButtonActive: {
    backgroundColor: '#6366F1',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  modeButtonTextActive: {
    color: '#FFFFFF',
  },
  statusContainer: {
    marginVertical: 16,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  winText: {
    color: '#16A34A',
  },
  drawText: {
    color: '#CA8A04',
  },
  blackText: {
    color: '#1F2937',
  },
  whiteText: {
    color: '#6B7280',
  },
});
