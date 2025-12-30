import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GameMode } from '../types/game';

interface ModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentMode === 'pvp' && styles.activeButton]}
        onPress={() => onModeChange('pvp')}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, currentMode === 'pvp' && styles.activeButtonText]}>
          Player vs Player
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, currentMode === 'ai' && styles.activeButton]}
        onPress={() => onModeChange('ai')}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, currentMode === 'ai' && styles.activeButtonText]}>
          Player vs AI
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  activeButton: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#6B7280',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
});
