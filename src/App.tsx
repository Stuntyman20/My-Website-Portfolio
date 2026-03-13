import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import GuessingGame from './components/GuessingGame';
import Notebook from './components/Notebook';

export default function App() {
  const [gameState, setGameState] = useState<'guessing' | 'notebook'>('guessing');
  const [hasOpenedNotebook, setHasOpenedNotebook] = useState(false);

  return (
    <div className="bg-gloomy-pulse overflow-hidden font-serif min-h-screen">
      <AnimatePresence mode="sync">
        {gameState === 'guessing' && (
          <GuessingGame 
            key="guessing" 
            hasOpenedNotebook={hasOpenedNotebook}
            onSelect={() => {
              setHasOpenedNotebook(true);
              setGameState('notebook');
            }} 
          />
        )}
        {gameState === 'notebook' && (
          <Notebook key="notebook" onClose={() => setGameState('guessing')} />
        )}
      </AnimatePresence>
    </div>
  );
}
