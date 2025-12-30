import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { GomokuCellValue } from '../types/gomoku';

interface GomokuCellProps {
  value: GomokuCellValue;
  onPress: () => void;
  isWinning: boolean;
}

export const GomokuCell: React.FC<GomokuCellProps> = ({ value, onPress, isWinning }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cell}
      activeOpacity={0.7}
    >
      {value && (
        <View
          style={[
            styles.stone,
            value === 'Black' ? styles.blackStone : styles.whiteStone,
            isWinning && styles.winningStone,
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 22,
    height: 22,
    borderWidth: 0.5,
    borderColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEB887',
  },
  stone: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#333',
  },
  blackStone: {
    backgroundColor: '#1F2937',
  },
  whiteStone: {
    backgroundColor: '#F9FAFB',
  },
  winningStone: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
});
