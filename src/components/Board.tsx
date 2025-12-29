import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cell } from './Cell';
import { Board as BoardType } from '../types/game';

interface BoardProps {
  board: BoardType;
  onCellPress: (index: number) => void;
  winningLine: number[] | null;
}

export const Board: React.FC<BoardProps> = ({ board, onCellPress, winningLine }) => {
  const renderRow = (startIndex: number) => {
    return (
      <View style={styles.row} key={startIndex}>
        {[0, 1, 2].map(offset => {
          const index = startIndex + offset;
          return (
            <Cell
              key={index}
              value={board[index]}
              onPress={() => onCellPress(index)}
              isWinning={winningLine?.includes(index) || false}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.board}>
      {renderRow(0)}
      {renderRow(3)}
      {renderRow(6)}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#E5E7EB',
    padding: 8,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
});
