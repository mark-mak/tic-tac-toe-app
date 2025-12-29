import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player, GameStatus } from '../types/game';

interface GameStatusProps {
  status: GameStatus;
  currentPlayer: Player;
  winner: Player | null;
}

export const GameStatusDisplay: React.FC<GameStatusProps> = ({ 
  status, 
  currentPlayer, 
  winner 
}) => {
  const getStatusText = () => {
    if (status === 'win' && winner) {
      return `Player ${winner} Wins! 🎉`;
    }
    if (status === 'draw') {
      return "It's a Draw! 🤝";
    }
    return `Current Player: ${currentPlayer}`;
  };

  const getStatusColor = () => {
    if (status === 'win') return styles.winText;
    if (status === 'draw') return styles.drawText;
    return currentPlayer === 'X' ? styles.xText : styles.oText;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, getStatusColor()]}>
        {getStatusText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  winText: {
    color: '#16A34A',
  },
  drawText: {
    color: '#CA8A04',
  },
  xText: {
    color: '#2563EB',
  },
  oText: {
    color: '#DC2626',
  },
});
