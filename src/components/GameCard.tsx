import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Game } from '../types/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Calculate card width: screen width - padding (32) - gaps between cards (16*2) / 3 columns
const CARD_WIDTH = (SCREEN_WIDTH - 32 - 32) / 3;
// Use smaller aspect ratio on smaller screens for more content space
const CARD_HEIGHT = CARD_WIDTH * 1.1;

interface GameCardProps {
  game: Game;
  onPress: () => void;
  isDarkMode?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPress, isDarkMode = false }) => {
  const isPlaceholder = game.id.startsWith('coming-');
  
  return (
    <TouchableOpacity
      style={[
        styles.card, 
        isDarkMode && styles.darkCard,
        isPlaceholder && styles.placeholderCard,
        isPlaceholder && isDarkMode && styles.darkPlaceholderCard,
      ]}
      onPress={onPress}
      activeOpacity={isPlaceholder ? 1 : 0.7}
    >
      <Text style={[styles.icon, isPlaceholder && styles.placeholderIcon]}>{game.icon}</Text>
      <Text 
        style={[styles.name, isDarkMode && styles.darkText, isPlaceholder && styles.placeholderText]} 
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
      >
        {game.name}
      </Text>
      <Text 
        style={[styles.description, isDarkMode && styles.darkSubText, isPlaceholder && styles.placeholderSubText]} 
        numberOfLines={1}
      >
        {game.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#374151',
  },
  placeholderCard: {
    backgroundColor: '#F3F4F6',
    opacity: 0.7,
  },
  darkPlaceholderCard: {
    backgroundColor: '#2D3748',
    opacity: 0.5,
  },
  icon: {
    fontSize: 32,
    marginBottom: 6,
  },
  placeholderIcon: {
    opacity: 0.5,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  darkText: {
    color: '#F9FAFB',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  description: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  darkSubText: {
    color: '#D1D5DB',
  },
  placeholderSubText: {
    color: '#9CA3AF',
  },
});
