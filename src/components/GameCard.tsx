import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Game } from '../types/navigation';

interface GameCardProps {
  game: Game;
  onPress: () => void;
  isDarkMode?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPress, isDarkMode = false }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isDarkMode && styles.darkCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{game.icon}</Text>
      <Text style={[styles.name, isDarkMode && styles.darkText]}>{game.name}</Text>
      <Text style={[styles.description, isDarkMode && styles.darkSubText]}>{game.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#374151',
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  darkText: {
    color: '#F9FAFB',
  },
  description: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  darkSubText: {
    color: '#D1D5DB',
  },
});
