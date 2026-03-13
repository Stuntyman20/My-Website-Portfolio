import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import GuessingGame from './components/GuessingGame';
import Notebook from './components/Notebook';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'guessing' | 'notebook'>('start');
  const [hasOpenedNotebook, setHasOpenedNotebook] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    setGameState('guessing');
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }, 1500);
  };

  const handleCorrectSelect = () => {
    if (audioRef.current) {
      // Fade out audio over 1 second
      const fadeAudio = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          clearInterval(fadeAudio);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }
      }, 100);
    }
  };

  return (
    <div className="bg-gloomy-pulse overflow-hidden font-serif h-screen w-screen fixed inset-0">
      <audio 
        ref={audioRef} 
        src="https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/Background%20Track%20for%20HERO.mp3" 
        loop 
      />
      <AnimatePresence mode="sync">
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <motion.button
              onClick={handleStart}
              animate={{ y: [0, -20, 0] }}
              exit={{ opacity: 0, scale: 3, filter: "blur(20px)", transition: { duration: 1, ease: "easeOut" } }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden px-14 py-5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 shadow-lg border border-white/20 text-white font-sans tracking-widest uppercase text-base group cursor-pointer"
            >
              <span className="relative z-10">Start</span>
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"
              />
            </motion.button>
          </motion.div>
        )}
        {gameState === 'guessing' && (
          <GuessingGame 
            key="guessing" 
            hasOpenedNotebook={hasOpenedNotebook}
            onCorrectSelect={handleCorrectSelect}
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
