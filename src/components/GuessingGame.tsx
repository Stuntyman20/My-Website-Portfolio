import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MirrorIcon, SpongeIcon, TvIcon, BucketIcon, NotebookIcon } from './Icons';
import { playSuccessChime, playSpinSound, playErrorSound, playHoverSound, playTwinkleSound } from '../utils/soundEffects';

const items = [
  { id: 'mirror', name: 'Mirror', Icon: MirrorIcon, feedback: 'Close… but a mirror only reflects.' },
  { id: 'sponge', name: 'Sponge', Icon: SpongeIcon, feedback: 'A sponge absorbs—this captures thoughts.' },
  { id: 'tv', name: 'TV', Icon: TvIcon, feedback: 'Not quite. A TV shows stories—this holds them.' },
  { id: 'notebook', name: 'Notebook', Icon: NotebookIcon, feedback: 'Correct :)' },
  { id: 'bucket', name: 'Bucket', Icon: BucketIcon, feedback: 'A bucket holds water. The answer holds ideas.' },
];

const TypewriterLine = ({ text, delay, className, skipAnimation }: { text: string, delay: number, className?: string, skipAnimation?: boolean }) => (
  <motion.p
    className={className}
    initial={skipAnimation ? "visible" : "hidden"}
    animate="visible"
    variants={{
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: skipAnimation ? 0 : delay,
          staggerChildren: skipAnimation ? 0 : 0.045
        }
      }
    }}
  >
    {text.split("").map((char, i) => (
      <motion.span 
        key={i} 
        variants={{
          hidden: { opacity: 0, filter: 'blur(10px)', y: 10, scale: 1.2 },
          visible: { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }
        }} 
        transition={{ duration: skipAnimation ? 0 : 0.8, ease: "easeOut" }}
        className="inline-block" 
        style={{ whiteSpace: 'pre' }}
      >
        {char}
      </motion.span>
    ))}
  </motion.p>
);

const SmokeCloud = ({ delay, skip }: { delay: number, skip: boolean }) => {
  if (skip) return null;
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0, 0.3, 0],
        scale: [0.5, 1.2, 1.5],
        filter: ["blur(5px)", "blur(10px)", "blur(20px)"]
      }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
    >
      <div className="w-24 h-24 bg-gray-300 rounded-full mix-blend-screen opacity-20 blur-xl" />
      <div className="absolute w-32 h-32 bg-gray-400 rounded-full mix-blend-screen opacity-10 blur-2xl translate-x-4 -translate-y-4" />
      <div className="absolute w-20 h-20 bg-gray-200 rounded-full mix-blend-screen opacity-15 blur-lg -translate-x-4 translate-y-4" />
    </motion.div>
  );
};

export default function GuessingGame({ onSelect, onCorrectSelect, hasOpenedNotebook }: { onSelect: () => void; onCorrectSelect?: () => void; hasOpenedNotebook?: boolean; key?: string }) {
  const [feedbackItem, setFeedbackItem] = useState<string | null>(null);
  const [unlockStep, setUnlockStep] = useState<number>(0);
  const [flashColor, setFlashColor] = useState<'red' | 'green' | null>(null);

  const isUnlocking = unlockStep > 0;

  const handleSelect = (id: string) => {
    if (isUnlocking || feedbackItem === 'notebook') return;
    setFeedbackItem(id);
    if (id === 'notebook') {
      if (onCorrectSelect) onCorrectSelect();
      playSuccessChime();
      setFlashColor('green');
      setTimeout(() => setFlashColor(null), 300);
      setTimeout(() => {
        setFeedbackItem(null); // Hide annotation first
        setTimeout(() => {
          setUnlockStep(1); // Spin
          playSpinSound();
          setTimeout(() => {
            setUnlockStep(2); // Lock open + sparkle
            playTwinkleSound();
            setTimeout(() => {
              onSelect();
            }, 600); // Wait for lock to open
          }, 800); // Wait for spin
        }, 400); // Wait for exit animation of the text
      }, 1000); // Show "Correct :)" for 1 second
    } else {
      playErrorSound();
      setFlashColor('red');
      setTimeout(() => setFlashColor(null), 300);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="flex flex-col items-center justify-center min-h-screen text-white z-10 relative px-4"
    >
      {/* Screen Flash Overlay */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
        animate={{ 
          boxShadow: flashColor === 'red' 
            ? 'inset 0 0 50px 10px rgba(239, 68, 68, 0.3)' 
            : flashColor === 'green' 
            ? 'inset 0 0 50px 10px rgba(34, 197, 94, 0.3)' 
            : 'inset 0 0 0px 0px rgba(0, 0, 0, 0)',
          opacity: flashColor ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Subtle Smoke Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center opacity-40 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`smoke-${i}`}
            className="absolute w-64 h-64 bg-gray-400/10 rounded-full blur-3xl"
            initial={{ opacity: 0, y: 150, x: (i - 2.5) * 60, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              y: -250, 
              x: (i - 2.5) * 100 + (i % 2 === 0 ? 50 : -50), 
              scale: 2.5 
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              delay: i * 1.5, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      <motion.div 
        className="text-center mb-10 md:mb-16 leading-relaxed tracking-wide drop-shadow-lg relative z-10"
        animate={{ opacity: isUnlocking ? 0 : 1, filter: isUnlocking ? 'blur(10px)' : 'blur(0px)' }}
        transition={{ duration: 1 }}
      >
        {/* Localized Smoke Effect Behind Text */}
        <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none opacity-60 mix-blend-screen">
          <motion.div
            className="absolute w-[120%] h-[150%] bg-gray-500/20 rounded-[100%] blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[100%] h-[120%] bg-purple-900/10 rounded-[100%] blur-3xl"
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        {[
          "I keep what cannot be held,",
          "And show what cannot be seen,",
          "Yet without a hand and a thought,",
          "I remain forever clean."
        ].map((line, i) => {
          const delays = [0.8, 2.5, 4.2, 5.9];
          return (
            <TypewriterLine
              key={i}
              text={line}
              delay={delays[i]}
              skipAnimation={hasOpenedNotebook}
              className={`font-riddle text-xl md:text-2xl text-gray-300 ${i === 3 ? 'mb-6' : 'mb-2'}`}
            />
          );
        })}
        <motion.p
          initial={{ opacity: hasOpenedNotebook ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: hasOpenedNotebook ? 0 : 7.6, duration: 0.8 }}
          className="mt-6 font-serif text-lg md:text-xl font-semibold text-gray-100"
        >
          What am I?
        </motion.p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-5xl">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            style={{ perspective: 1000 }}
            initial={hasOpenedNotebook ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={
              isUnlocking && item.id !== 'notebook'
                ? { opacity: 0, scale: 0.8, filter: 'blur(10px)' }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            transition={{ 
              delay: isUnlocking ? 0 : (hasOpenedNotebook ? 0 : 9.0 + index * 0.8), 
              duration: isUnlocking ? 0.8 : 0.8 
            }}
          >
            <motion.div
              layoutId={item.id === 'notebook' ? 'notebook-container' : undefined}
              className={`relative cursor-pointer group flex flex-col items-center ${isUnlocking && item.id === 'notebook' ? 'z-50' : ''}`}
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => handleSelect(item.id)}
              onMouseEnter={() => {
                if (!isUnlocking) playHoverSound();
              }}
              onMouseLeave={() => {
                if (!isUnlocking && feedbackItem === item.id && item.id !== 'notebook') {
                  setFeedbackItem(null);
                }
              }}
              whileHover={!isUnlocking ? { scale: 1.1 } : undefined}
              animate={
                unlockStep === 1 && item.id === 'notebook'
                  ? {
                      scale: 1.2,
                      y: -20,
                      rotateY: 360,
                      filter: "drop-shadow(0px 0px 30px rgba(168,85,247,0.8))"
                    }
                  : unlockStep === 2 && item.id === 'notebook'
                  ? {
                      scale: 1.2,
                      y: -20,
                      rotateY: 360,
                      filter: "drop-shadow(0px 0px 80px rgba(255,255,255,1)) drop-shadow(0px 0px 120px rgba(168,85,247,1))"
                    }
                  : feedbackItem === item.id 
                    ? { 
                        y: 0, 
                        scale: 1.1,
                        filter: item.id === 'notebook' ? "drop-shadow(0px 0px 20px rgba(168,85,247,0.8))" : "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
                      } 
                    : { 
                        y: [0, -10, 0],
                        filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
                      }
              }
              transition={
                unlockStep === 1 && item.id === 'notebook'
                  ? { duration: 0.8, ease: "easeInOut" }
                  : feedbackItem === item.id
                    ? { type: "spring", stiffness: 300 }
                    : {
                        y: { duration: 4, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" },
                        scale: { type: "spring", stiffness: 300, damping: 20 }
                      }
              }
            >
              <SmokeCloud delay={9.0 + index * 0.8} skip={hasOpenedNotebook || false} />
              <div className="w-24 h-24 md:w-32 md:h-32 transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                <item.Icon unlockStep={item.id === 'notebook' ? unlockStep : undefined} />
              </div>
              <div className={`absolute -bottom-8 transition-opacity duration-300 text-gray-400 font-serif tracking-widest text-sm md:text-base pointer-events-none ${(feedbackItem === item.id || (isUnlocking && item.id === 'notebook')) ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                {item.name}
              </div>
              <AnimatePresence>
                {feedbackItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
                    className={`absolute -bottom-12 left-1/2 -translate-x-1/2 font-sans font-bold uppercase tracking-widest text-xs whitespace-nowrap bg-black/80 px-4 py-2 rounded-lg backdrop-blur-md border-2 ${item.id === 'notebook' ? 'text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]'}`}
                  >
                    {item.feedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
