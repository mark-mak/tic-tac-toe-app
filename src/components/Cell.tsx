import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CellValue } from '../types/game';

interface CellProps {
  value: CellValue;
  onPress: () => void;
  isWinning: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onPress, isWinning }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cell, isWinning && styles.winningCell]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, value === 'X' ? styles.xText : styles.oText]}>
        {value || ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 96,
    height: 96,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  winningCell: {
    backgroundColor: '#BBF7D0',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  xText: {
    color: '#2563EB',
  },
  oText: {
    color: '#DC2626',
  },
});
