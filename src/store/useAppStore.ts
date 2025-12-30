import { create } from 'zustand';

interface AppState {
  // Theme/Settings (example for future expansion)
  isDarkMode: boolean;
  soundEnabled: boolean;
  
  // Game stats (example for future expansion)
  gamesPlayed: number;
  
  // Actions
  toggleDarkMode: () => void;
  toggleSound: () => void;
  incrementGamesPlayed: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isDarkMode: false,
  soundEnabled: true,
  gamesPlayed: 0,
  
  // Actions
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  incrementGamesPlayed: () => set((state) => ({ gamesPlayed: state.gamesPlayed + 1 })),
}));
