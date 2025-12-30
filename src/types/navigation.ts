import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Screen = 'home' | 'tic-tac-toe' | 'gomoku';

export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  screen: Screen;
}

// Navigation Stack Params
export type RootStackParamList = {
  Home: undefined;
  TicTacToe: undefined;
  Gomoku: undefined;
  Settings: undefined;
};

// Screen Props Types
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TicTacToeScreenProps = NativeStackScreenProps<RootStackParamList, 'TicTacToe'>;
export type GomokuScreenProps = NativeStackScreenProps<RootStackParamList, 'Gomoku'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

// Navigation prop declarations
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
