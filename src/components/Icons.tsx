import { motion } from 'motion/react';

export const MirrorIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
    <defs>
      <linearGradient id="mirrorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <clipPath id="mirrorClip">
        <ellipse cx="50" cy="50" rx="28" ry="41" />
      </clipPath>
    </defs>
    {/* Ornate frame */}
    <ellipse cx="50" cy="50" rx="35" ry="48" fill="#cbd5e1" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
    <ellipse cx="50" cy="50" rx="30" ry="43" fill="#0f172a" />
    <ellipse cx="50" cy="50" rx="28" ry="41" fill="url(#mirrorGrad)" />
    {/* Reflection animation */}
    <g clipPath="url(#mirrorClip)">
      <motion.line x1="-20" y1="0" x2="120" y2="100" stroke="#ffffff" strokeWidth="15" opacity="0.6"
        animate={{ x: [-150, 150], y: [-150, 150] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
      <motion.line x1="-20" y1="-20" x2="120" y2="80" stroke="#ffffff" strokeWidth="5" opacity="0.4"
        animate={{ x: [-150, 150], y: [-150, 150] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
    </g>
  </svg>
);

export const SpongeIcon = () => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(253,224,71,0.2)]"
    animate={{ scale: [1, 0.95, 1.02, 1], y: [0, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* Left Face - Green Bottom */}
      <path d="M 14 56 L 58 78 L 58 86 L 14 64 Z" fill="#15803d" stroke="#064e3b" strokeWidth="3" />
      {/* Right Face - Green Bottom */}
      <path d="M 58 78 L 86 64 L 86 72 L 58 86 Z" fill="#166534" stroke="#064e3b" strokeWidth="3" />
      
      {/* Left Face - Yellow Top */}
      <path d="M 14 36 L 58 58 L 58 78 L 14 56 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
      {/* Right Face - Yellow Top */}
      <path d="M 58 58 L 86 44 L 86 64 L 58 78 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="3" />
      
      {/* Top Face - Yellow */}
      <path d="M 42 22 L 86 44 L 58 58 L 14 36 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
      
      {/* Pores on Top Face */}
      <circle cx="50" cy="40" r="5" fill="#a16207" opacity="0.6" />
      <circle cx="35" cy="35" r="3" fill="#a16207" opacity="0.5" />
      <circle cx="65" cy="48" r="4" fill="#a16207" opacity="0.5" />
      <circle cx="70" cy="35" r="2" fill="#a16207" opacity="0.7" />
      
      {/* Pores on Left Face */}
      <circle cx="36" cy="57" r="3.5" fill="#a16207" opacity="0.5" />
      <circle cx="25" cy="48" r="3" fill="#a16207" opacity="0.6" />
      <circle cx="48" cy="65" r="2.5" fill="#a16207" opacity="0.4" />
      
      {/* Pores on Right Face */}
      <circle cx="72" cy="61" r="3" fill="#a16207" opacity="0.5" />
      <circle cx="80" cy="55" r="2" fill="#a16207" opacity="0.6" />
      
      {/* Foam bubbles on Bottom of Green part */}
      {[
        { cx: 18, cy: 66, r: 2.5, delay: 0 },
        { cx: 26, cy: 70, r: 3, delay: 0.2 },
        { cx: 36, cy: 75, r: 2, delay: 0.5 },
        { cx: 46, cy: 80, r: 3.5, delay: 0.1 },
        { cx: 54, cy: 84, r: 2.5, delay: 0.8 },
        { cx: 62, cy: 84, r: 3, delay: 0.3 },
        { cx: 70, cy: 80, r: 2, delay: 0.6 },
        { cx: 78, cy: 76, r: 3.5, delay: 0.4 },
        { cx: 84, cy: 73, r: 2.5, delay: 0.9 },
        { cx: 22, cy: 69, r: 1.5, delay: 0.4 },
        { cx: 40, cy: 78, r: 2, delay: 0.7 },
        { cx: 58, cy: 86, r: 2.5, delay: 0.1 },
        { cx: 66, cy: 81, r: 1.5, delay: 0.5 },
      ].map((bubble, i) => (
        <motion.circle 
          key={i} 
          cx={bubble.cx} 
          cy={bubble.cy} 
          r={bubble.r} 
          fill="#ffffff" 
          animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0], y: [0, -3, 0] }}
          transition={{ duration: 1.5 + bubble.delay, repeat: Infinity, ease: "easeInOut", delay: bubble.delay }}
        />
      ))}
    </g>
  </motion.svg>
);

export const TvIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
    <defs>
      <filter id="tvStatic">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise">
          <animate attributeName="baseFrequency" values="0.8;0.9;0.7;0.85;0.8" dur="0.2s" repeatCount="indefinite" />
        </feTurbulence>
        <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" />
      </filter>
    </defs>
    <rect x="15" y="25" width="70" height="50" rx="5" fill="#0f172a" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
    <rect x="25" y="32" width="40" height="36" fill="#111111" rx="2" />
    
    {/* Screen Content - Static */}
    <rect x="25" y="32" width="40" height="36" filter="url(#tvStatic)" opacity="0.8" />
    
    {/* Screen static overlay / flicker */}
    <motion.rect x="25" y="32" width="40" height="36" fill="#ffffff"
      animate={{ opacity: [0.05, 0.15, 0.05, 0.2, 0.05] }}
      transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
      style={{ mixBlendMode: 'overlay' }}
    />

    <circle cx="75" cy="40" r="3" fill="#ffffff" />
    <circle cx="75" cy="50" r="3" fill="#ffffff" />
    <path d="M50 25 L30 10 M50 25 L70 10" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const BucketIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
    {/* Handle */}
    <path d="M20 40 C 20 10, 80 10, 80 40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
    {/* Handle attachment points */}
    <circle cx="20" cy="40" r="4" fill="rgba(255,255,255,0.7)" />
    <circle cx="80" cy="40" r="4" fill="rgba(255,255,255,0.7)" />
    {/* Bucket Body */}
    <path d="M25 40 L32 85 C 32 90, 68 90, 68 85 L75 40 Z" fill="#94a3b8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Bucket Rim */}
    <ellipse cx="50" cy="40" rx="25" ry="6" fill="#64748b" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
    {/* Water surface */}
    <ellipse cx="50" cy="42" rx="22" ry="4" fill="#0ea5e9" opacity="0.8" />
    
    {/* Water drips (overflowing from top front) */}
    <motion.circle
      cx="40" cy="46" r="2" fill="#0ea5e9" opacity="0.8"
      animate={{ y: [0, 35], opacity: [0, 1, 0], scaleY: [0.5, 1.5, 1], scaleX: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.5 }}
    />
    <motion.circle
      cx="56" cy="48" r="1.5" fill="#0ea5e9" opacity="0.6"
      animate={{ y: [0, 30], opacity: [0, 1, 0], scaleY: [0.5, 1.5, 1], scaleX: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeIn", delay: 1.2 }}
    />
  </svg>
);

export const NotebookIcon = ({ unlockStep }: { unlockStep?: number }) => (
  <motion.svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    animate={unlockStep && unlockStep > 0 ? { scale: 1.1 } : { y: [0, -5, 0] }}
    transition={unlockStep && unlockStep > 0 ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <rect x="25" y="15" width="50" height="70" rx="4" fill="#9333ea" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
    <rect x="32" y="16" width="42" height="68" fill="#7e22ce" rx="3" />
    <line x1="32" y1="16" x2="32" y2="84" stroke="#9333ea" strokeWidth="2" />
    
    {/* Lock Group */}
    <motion.g
      animate={(!unlockStep || unlockStep === 0) ? {
        rotate: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8, 8, -8, 8, 0, 0],
        x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, -1, 1, 0, 0]
      } : { rotate: 0, x: 0 }}
      transition={(!unlockStep || unlockStep === 0) ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.1 }}
      style={{ transformOrigin: "76px 48px" }}
    >
      {/* Lock Body */}
      <rect x="70" y="48" width="12" height="10" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
      <circle cx="76" cy="53" r="1.5" fill="#b45309" />
      <line x1="76" y1="54.5" x2="76" y2="56" stroke="#b45309" strokeWidth="1" />
      
      {/* Lock Shackle */}
      <motion.path
        d="M72 48 V 43 A 4 4 0 0 1 80 43 V 48"
        stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round"
        initial={{ y: 0, rotate: 0 }}
        animate={unlockStep && unlockStep >= 2 ? { y: -6, rotate: 25, x: 2 } : { y: 0, rotate: 0 }}
        transformOrigin="80px 48px"
        transition={{ duration: 0.6, type: "spring", bounce: 0.6 }}
      />
    </motion.g>

    {/* Twinkle */}
    <motion.path
      d="M 76 40 L 77.5 43.5 L 81 45 L 77.5 46.5 L 76 50 L 74.5 46.5 L 71 45 L 74.5 43.5 Z"
      fill="#ffffff"
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={unlockStep && unlockStep >= 2 ? { opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 90 } : {}}
      transition={{ duration: 0.8 }}
    />
  </motion.svg>
);
