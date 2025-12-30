import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard } from '../components/GameCard';
import { Game, HomeScreenProps } from '../types/navigation';
import { APP_VERSION } from '../utils/version';
import { useAppStore } from '../store/useAppStore';

const GAMES: Game[] = [
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    description: '3x3 grid game',
    icon: '❌', // ⭕
    screen: 'tic-tac-toe',
  },
  {
    id: 'gomoku',
    name: 'Gomoku',
    description: 'Five in a Row',
    icon: '⚫', // ⚪
    screen: 'gomoku',
  },
];

// Fill remaining slots with "Coming Soon" placeholders to make 9 total
const PLACEHOLDER_GAMES: Game[] = [
  { id: 'coming-1', name: 'Coming Soon', description: 'New game', icon: '🎮', screen: 'tic-tac-toe' },
  { id: 'coming-2', name: 'Coming Soon', description: 'New game', icon: '🎯', screen: 'tic-tac-toe' },
  { id: 'coming-3', name: 'Coming Soon', description: 'New game', icon: '🎲', screen: 'tic-tac-toe' },
  { id: 'coming-4', name: 'Coming Soon', description: 'New game', icon: '🃏', screen: 'tic-tac-toe' },
  { id: 'coming-5', name: 'Coming Soon', description: 'New game', icon: '🎪', screen: 'tic-tac-toe' },
  { id: 'coming-6', name: 'Coming Soon', description: 'New game', icon: '🎨', screen: 'tic-tac-toe' },
  { id: 'coming-7', name: 'Coming Soon', description: 'New game', icon: '🎭', screen: 'tic-tac-toe' },
];

const ALL_GAMES = [...GAMES, ...PLACEHOLDER_GAMES].slice(0, 9);

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { isDarkMode } = useAppStore();
  
  const handleGameSelect = (game: Game) => {
    // Don't navigate for placeholder games
    if (game.id.startsWith('coming-')) return;
    
    if (game.screen === 'tic-tac-toe') {
      navigation.navigate('TicTacToe');
    } else if (game.screen === 'gomoku') {
      navigation.navigate('Gomoku');
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, isDarkMode && styles.darkText]}>Mini Game Hub</Text>
          <Text style={[styles.subtitle, isDarkMode && styles.darkSubText]}>Choose a game to play</Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')} 
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={ALL_GAMES}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => handleGameSelect(item)}
            isDarkMode={isDarkMode}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        style={styles.list}
      />
      
      <Text style={[styles.version, isDarkMode && styles.darkSubText]}>v{APP_VERSION}</Text>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  settingsButton: {
    padding: 8,
    marginLeft: 8,
  },
  settingsIcon: {
    fontSize: 28,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  darkText: {
    color: '#F9FAFB',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  darkSubText: {
    color: '#D1D5DB',
  },
  grid: {
    padding: 8,
  },
  version: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
