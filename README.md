# Hangman Game

A modern, interactive Hangman word-guessing game built with Astro and React.

## 🎮 Features

- Multiple word categories (Animals, Movies, Fruits, Countries, Jobs, Sports, Transportation, Colors)
- Interactive keyboard and on-screen letter buttons
- Real-time wrong guess tracking with visual feedback
- Win/Lose dialog with game results
- Responsive design with beautiful UI
- React Context for state management across components

## 🚀 Project Structure

```text
/
├── public/
│   └── images/           # Game icons and assets
├── src/
│   ├── assets/
│   │   └── data.ts       # Game data (categories, words, characters)
│   ├── components/
│   │   ├── Dialog.tsx           # Result dialog component
│   │   ├── GameApp.tsx          # Main game container
│   │   ├── GuessProvider.tsx   # React Context provider
│   │   ├── GuessWordForm.tsx   # Game logic and UI
│   │   ├── HeartCount.tsx      # Wrong guess counter
│   │   ├── MenuButton.astro    # Pause menu
│   │   └── Title.astro         # Title component
│   ├── context/
│   │   └── guess-context.tsx   # React Context definition
│   ├── layouts/
│   │   ├── Layout.astro        # Base layout
│   │   └── MainLayout.astro    # Main content layout
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   └── categories/
│   │       └── [category].astro # Dynamic category pages
│   └── utils/
│       ├── generate-word.ts    # Word generation logic
│       └── game-rule.ts        # Game constants
└── package.json
```

## 🛠️ Tech Stack

- **Astro** - Static site framework
- **React** - Interactive components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management

## 🎯 How to Play

1. Choose a category from the home page
2. A random word from that category will be selected
3. Guess letters by:
   - Clicking on-screen letter buttons
   - Typing on your keyboard
4. Each wrong guess decreases your health
5. Win by guessing all letters before running out of health
6. Lose if you make 8 wrong guesses

## 🔑 Key Learnings

This project demonstrates:

- **Astro Islands Architecture**: Using React components within Astro pages
- **React Context in Astro**: Proper setup of React Context with a single island to share state
- **TypeScript**: Strong typing throughout the application
- **State Management**: Using `useState`, `useContext`, `useRef`, and `useEffect` hooks
- **Event Handling**: Keyboard and mouse event listeners in React
- **Dynamic Routing**: Astro's file-based routing with dynamic parameters

## 📝 Important Notes

- React Context only works within a single React island in Astro
- All components that need to share context must be within the same `client:load` component
- Use `forwardRef` to pass refs to custom React components
- State updates should be done immutably (especially with Sets and Arrays)

