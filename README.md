# Tic-Tac-Toe React Native App

A beautiful and interactive Tic-Tac-Toe game built with React Native, TypeScript, and NativeWind (Tailwind CSS).

## 🎮 Features

- ✨ Clean and modern UI with Tailwind CSS styling
- 🎯 Full game logic with win detection and draw handling
- 🔄 New game functionality
- 📱 Responsive design for mobile devices
- 🎨 Visual feedback for winning combinations
- ⚡ Built with TypeScript for type safety
- 🏗️ Modular component architecture

## 📁 Project Structure

```
tic-tac-toe-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Board.tsx       # Game board container
│   │   ├── Cell.tsx        # Individual cell component
│   │   ├── GameStatusDisplay.tsx  # Status message display
│   │   ├── Button.tsx      # Reusable button component
│   │   └── index.ts        # Component exports
│   ├── hooks/              # Custom React hooks
│   │   └── useGameState.ts # Game state management hook
│   ├── screens/            # Screen components
│   │   └── GameScreen.tsx  # Main game screen
│   ├── types/              # TypeScript type definitions
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
