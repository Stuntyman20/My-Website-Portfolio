import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import GuessingGame from './components/GuessingGame';
import Notebook from './components/Notebook';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'guessing' | 'notebook'>('start');
  const [hasOpenedNotebook, setHasOpenedNotebook] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    // Play immediately on click to satisfy browser autoplay policies
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    
    setGameState('guessing');
    
    setTimeout(() => {
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.15) {
          let newVolume = audioRef.current.volume + 0.005;
          if (newVolume > 0.15) newVolume = 0.15;
          audioRef.current.volume = newVolume;
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    }, 1100);
  };

  const handleCorrectSelect = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleCloseNotebook = () => {
    setGameState('guessing');
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.15) {
          let newVolume = audioRef.current.volume + 0.005;
          if (newVolume > 0.15) newVolume = 0.15;
          audioRef.current.volume = newVolume;
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    }
  };

  return (
    <div className="bg-gloomy-pulse overflow-hidden font-serif h-screen w-screen fixed inset-0">
      <audio 
        ref={audioRef} 
        src="https://raw.githubusercontent.com/Stuntyman20/My-Website-Portfolio/main/Background_Track_Hero.mp3" 
        loop 
        preload="auto"
        crossOrigin="anonymous"
      />
      <AnimatePresence mode="sync">
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 gap-8"
          >
            <motion.button
              onClick={handleStart}
              animate={{ scale: [1, 1.08, 1], y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              exit={{ opacity: 0, scale: 3, filter: "blur(20px)", transition: { duration: 1, ease: "easeOut" } }}
              className="relative overflow-hidden px-14 py-5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 shadow-lg border border-white/20 text-white font-sans tracking-widest uppercase text-base group cursor-pointer"
            >
              <span className="relative z-10">Start</span>
            </motion.button>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="text-white/40 text-sm font-sans tracking-widest font-light"
            >
              Turn your sound ON for the best experience :)
            </motion.p>
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
          <Notebook key="notebook" onClose={handleCloseNotebook} />
        )}
      </AnimatePresence>
    </div>
  );
}
