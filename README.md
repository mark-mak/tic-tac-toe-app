# Mini Game Hub - React Native App

A mini-game hub featuring classic board games built with React Native, Expo, and TypeScript.

## 🎮 Features

### Games Included
1. **Tic-Tac-Toe**
   - Classic 3x3 grid gameplay
   - Player vs Player mode
   - Player vs AI mode (Minimax algorithm for perfect play)
   - Highlights winning combinations

2. **Gomoku (Five in a Row)**
   - 15x15 board
   - Traditional Five-in-a-row rules
   - Two-player mode
   - Winning line highlights

### App Features
- 🏠 Home screen with game grid selector
- ✨ Clean, modern UI with React Native StyleSheet
- 🎯 Complete game logic for each game
- 📱 Responsive design for mobile devices
- 🎨 Visual feedback for winning combinations
- ⚡ Built with TypeScript for type safety
- 🏗️ Modular component architecture

## 📁 Project Structure

```
tic-tac-toe-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Board.tsx       # Tic-Tac-Toe board
│   │   ├── Cell.tsx        # Tic-Tac-Toe cell
│   │   ├── GomokuBoard.tsx # Gomoku board
│   │   ├── GomokuCell.tsx  # Gomoku cell
│   │   ├── GameCard.tsx    # Home screen game selector
│   │   ├── GameStatusDisplay.tsx  # Status message display
│   │   ├── ModeSelector.tsx # PvP/AI mode selector
│   │   ├── Button.tsx      # Reusable button component
│   │   └── index.ts        # Component exports
│   ├── hooks/              # Custom React hooks
│   │   ├── useGameState.ts # Tic-Tac-Toe state management
│   │   └── useGomokuState.ts # Gomoku state management
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.tsx  # Game selection hub
│   │   ├── GameScreen.tsx  # Tic-Tac-Toe game screen
│   │   └── GomokuScreen.tsx # Gomoku game screen
│   ├── store/              # Global state management
│   │   └── useAppStore.ts  # Zustand store for app-wide state
│   ├── types/              # TypeScript type definitions
│   │   ├── game.ts         # Tic-Tac-Toe types
│   │   ├── gomoku.ts       # Gomoku types
│   │   └── navigation.ts   # React Navigation types
│   └── utils/              # Utility functions
│       ├── gameLogic.ts    # Tic-Tac-Toe game logic
│       ├── gomokuLogic.ts  # Gomoku game logic
│       ├── ai.ts           # Minimax AI algorithm
│       └── version.ts      # App version
├── App.tsx                 # Root component with navigation
└── package.json            # Dependencies and scripts
```

## 🏗️ Architecture

### Navigation
- **React Navigation v6** with Native Stack Navigator
- Type-safe navigation with TypeScript
- Smooth slide transitions between screens
- Hardware back button support on Android

### State Management
- **Zustand** for global app state (theme, settings, stats)
- Local state with custom hooks for game logic
- Separation of concerns: UI components + game logic

### Key Patterns
- **Component-based architecture**: Reusable, testable components
- **Custom hooks**: Encapsulated game state and logic
- **TypeScript**: Full type safety across navigation and state
- **Modular structure**: Easy to add new games
│   │   └── game.ts         # Game-related types
│   └── utils/              # Utility functions
│       └── gameLogic.ts    # Game logic functions
├── assets/                 # Images and media files
├── App.tsx                 # Root component
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── metro.config.js         # Metro bundler configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── global.css              # Global CSS for NativeWind

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (optional)

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd tic-tac-toe-app
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the App

Start the Expo development server:

```bash
npm start
```

This will open Expo DevTools in your browser. From there, you can:

- **iOS Simulator**: Press `i` (requires macOS with Xcode)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: Scan the QR code with Expo Go app
- **Web Browser**: Press `w` (experimental)

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## 🎯 How to Play

1. The game starts with Player X
2. Tap any empty cell to make your move
3. Players alternate between X and O
4. First player to get 3 in a row (horizontal, vertical, or diagonal) wins
5. If all cells are filled with no winner, it's a draw
6. Tap "New Game" to start over

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **NativeWind** - Tailwind CSS for React Native
- **React Hooks** - State management

## 📚 Key Components

### Custom Hook: `useGameState`
Manages the entire game state including:
- Board state
- Current player
- Game status (playing, win, draw)
- Winner and winning line
- Move and reset functions

### Components
- **Board**: Container for the 3x3 grid
- **Cell**: Individual clickable cell with X/O display
- **GameStatusDisplay**: Shows current player or game result
- **Button**: Reusable styled button component

### Game Logic
- **checkWinner**: Detects winning combinations
- **checkDraw**: Determines if the game is a draw
- **createEmptyBoard**: Initializes a new game board

## 🎨 Customization

### Changing Colors
Edit `src/components/Cell.tsx` and `src/components/GameStatusDisplay.tsx` to modify the color scheme using Tailwind classes.

### Modifying Board Size
The game is currently 3x3. To change the size, you'll need to:
1. Update `WINNING_COMBINATIONS` in `src/utils/gameLogic.ts`
2. Modify the `createEmptyBoard` function
3. Adjust the `Board` component's grid layout

## 📝 Notes

- Asset placeholders are included in the `assets/` folder. Replace them with actual icons and images for production.
- The app uses NativeWind v4 for styling, which compiles Tailwind CSS to React Native styles.
- TypeScript provides type safety throughout the application.

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available under the MIT License.

---

Made with ❤️ using React Native, TypeScript, and NativeWind
