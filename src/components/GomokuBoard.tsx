import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { GomokuCell } from './GomokuCell';
import { GomokuBoard as GomokuBoardType } from '../types/gomoku';
import { GOMOKU_BOARD_SIZE } from '../utils/gomokuLogic';

interface GomokuBoardProps {
  board: GomokuBoardType;
  onCellPress: (row: number, col: number) => void;
  winningLine: { row: number; col: number }[] | null;
}

export const GomokuBoard: React.FC<GomokuBoardProps> = ({ board, onCellPress, winningLine }) => {
  const isWinningCell = (row: number, col: number) => {
    return winningLine?.some(pos => pos.row === row && pos.col === col) || false;
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <GomokuCell
                  key={`${rowIndex}-${colIndex}`}
                  value={cell}
                  onPress={() => onCellPress(rowIndex, colIndex)}
                  isWinning={isWinningCell(rowIndex, colIndex)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    backgroundColor: '#DEB887',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  row: {
    flexDirection: 'row',
  },
});
