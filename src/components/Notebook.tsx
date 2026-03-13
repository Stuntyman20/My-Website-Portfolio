import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const TOTAL_PAGES = 26;

const getPageContent = (pageNum: number, onImageClick: (src: string) => void) => {
  if (pageNum === 1) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-slate-800 relative">
        <h1 className="text-5xl md:text-7xl font-serif italic font-medium tracking-wide mb-8 capitalize drop-shadow-sm text-slate-700" style={{ fontFamily: '"Playfair Display", serif' }}>Portfolio</h1>
        <div className="w-24 h-[1px] bg-slate-400"></div>
        <p className="text-sm text-slate-500 tracking-[0.3em] uppercase mt-8">Can Öztunc</p>
        <span className="absolute bottom-2 right-2 text-slate-500 text-sm font-mono">01</span>
      </div>
    );
  }
  
  if (pageNum === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-slate-800 relative -ml-4 md:-ml-8 gap-12">
        <p className="text-lg md:text-xl text-slate-600 tracking-widest leading-loose max-w-md italic">
          “Architecture is the learned game, correct and magnificent, of forms assembled in the light.”<br/><br/>— Le Corbusier
        </p>
        <p className="text-lg md:text-xl text-slate-600 tracking-widest leading-loose max-w-md italic">
          “A city that neglects the child neglects the future.”<br/><br/>— Aldo van Eyck
        </p>
        <span className="absolute bottom-2 left-2 text-slate-500 text-sm font-mono">00</span>
      </div>
    );
  }

  if (pageNum === TOTAL_PAGES - 2) {
    return (
      <div className="h-full relative">
        <span className="absolute bottom-2 left-2 text-slate-500 text-sm font-mono">{TOTAL_PAGES - 2}</span>
      </div>
    );
  }

  if (pageNum === TOTAL_PAGES - 1) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-slate-800 relative">
        <h2 className="text-3xl font-light tracking-widest mb-6">Fin.</h2>
        <div className="w-12 h-[1px] bg-slate-400 mb-6"></div>
        <p className="text-slate-600 tracking-wider">Thank you for observing.</p>
        <span className="absolute bottom-2 right-2 text-slate-500 text-sm font-mono">{TOTAL_PAGES - 1}</span>
      </div>
    );
  }

  const isEven = pageNum % 2 === 0;
  const projectNum = Math.floor(pageNum / 2);
  const imageId = 100 + projectNum;

  return (
    <div className="h-full flex flex-col text-slate-800 relative pt-4">
      <div className="flex justify-between items-end mb-4 border-b border-slate-300 pb-2">
        <h2 className="text-2xl font-light tracking-wider uppercase text-slate-900">
          {isEven ? `Project ${projectNum}` : ''}
        </h2>
      </div>
      <span className={`absolute bottom-2 ${isEven ? 'left-2' : 'right-2'} text-slate-500 text-sm font-mono`}>{pageNum < 10 ? `0${pageNum}` : pageNum}</span>
      
      {isEven ? (
        <div className="flex-1 flex flex-col gap-6">
          <div 
            className="relative w-full h-64 rounded-sm overflow-hidden group shadow-sm cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onImageClick(`https://picsum.photos/seed/arch${imageId}/800/500?grayscale`); }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src={`https://picsum.photos/seed/arch${imageId}/800/500?grayscale`} 
              alt="Architecture" 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-sm text-slate-600 leading-relaxed text-justify font-light">
              The structural integrity of the void space creates a dialogue between presence and absence. 
              Concrete and shadow intertwine, forming a monolithic sanctuary that defies the ephemeral nature of time.
              Light pierces through the brutalist geometry, revealing the hidden textures of the urban fabric.
            </p>
            <div 
              className="relative w-full h-48 md:h-full rounded-sm overflow-hidden group shadow-sm cursor-pointer"
              onClick={(e) => { e.stopPropagation(); onImageClick(`https://picsum.photos/seed/detail${imageId}/400/400?grayscale`); }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src={`https://picsum.photos/seed/detail${imageId}/400/400?grayscale`} 
                alt="Detail" 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4 h-48">
             {[1, 2, 3].map((i) => (
               <div 
                 key={i} 
                 className="relative w-full h-full rounded-sm overflow-hidden group shadow-sm cursor-pointer"
                 onClick={(e) => { e.stopPropagation(); onImageClick(`https://picsum.photos/seed/plan${imageId}${i}/300/400?grayscale`); }}
               >
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-700 z-10" />
                 <img src={`https://picsum.photos/seed/plan${imageId}${i}/300/400?grayscale`} alt="Plan" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" referrerPolicy="no-referrer" />
               </div>
             ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed text-justify mt-4 md:columns-2 gap-8 font-light">
            Spatial dynamics are redefined through the subtraction of mass. The resulting cavities serve not merely as circulation, but as contemplative zones where the inhabitant is forced to confront the scale of the edifice. The juxtaposition of raw materials against the precision of the grid establishes a tension that resonates throughout the entire complex. Every line drawn is a boundary; every boundary is an invitation to cross.
          </p>
        </div>
      )}
    </div>
  );
};

const leftPageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 180 : 0,
    zIndex: direction > 0 ? 30 : 10,
    boxShadow: direction > 0 ? "-20px 0px 30px rgba(0,0,0,0.2)" : "0px 0px 0px rgba(0,0,0,0)"
  }),
  center: {
    rotateY: 0,
    zIndex: 20,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  exit: (direction: number) => ({
    rotateY: direction < 0 ? 180 : 0,
    zIndex: direction < 0 ? 30 : 10,
    boxShadow: direction < 0 ? "-20px 0px 30px rgba(0,0,0,0.2)" : "0px 0px 0px rgba(0,0,0,0)"
  })
};

const rightPageVariants = {
  enter: (direction: number) => ({
    rotateY: direction < 0 ? -180 : 0,
    zIndex: direction < 0 ? 30 : 10,
    boxShadow: direction < 0 ? "20px 0px 30px rgba(0,0,0,0.2)" : "0px 0px 0px rgba(0,0,0,0)"
  }),
  center: {
    rotateY: 0,
    zIndex: 20,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -180 : 0,
    zIndex: direction > 0 ? 30 : 10,
    boxShadow: direction > 0 ? "20px 0px 30px rgba(0,0,0,0.2)" : "0px 0px 0px rgba(0,0,0,0)"
  })
};

export default function Notebook({ onClose }: { onClose: () => void; key?: string }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const nextPage = () => {
    if (currentPage < TOTAL_PAGES - 2) {
      setDirection(1);
      setCurrentPage(p => p + 2);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(p => p - 2);
    }
  };

  const linedPaperStyle = {
    backgroundImage: `
      linear-gradient(#cbd5e1 0.5px, transparent 0.5px),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")
    `,
    backgroundSize: '100% 2rem, 150px 150px',
    backgroundPosition: '0 2rem, 0 0',
    backgroundColor: '#f8f9fa'
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-[#050505]"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #1a1a24 0%, #050505 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
    >
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/20 opacity-60 hover:opacity-100 backdrop-blur-md transition-all duration-300 z-50 shadow-lg border border-white/10"
      >
        <X size={24} className="text-gray-300" />
      </button>

      <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative w-full h-full" style={{ perspective: '2500px' }}>
        <motion.div 
          layoutId="notebook-container"
          className="w-full max-w-6xl h-[80vh] bg-[#0f0f13] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative mx-auto rounded-xl flex border border-gray-800/50 overflow-hidden"
          initial={{ rotateY: 360 }}
          animate={{ rotateY: 360 }}
          exit={{ rotateY: 360 }}
        >
          
          {/* Center spine shadow */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-32 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-30" />
          
          <div 
            className="w-full h-full cursor-pointer relative z-10" 
            style={{ perspective: '3000px' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              if (x > rect.width / 2) {
                nextPage();
              } else {
                prevPage();
              }
            }}
          >
            <AnimatePresence custom={direction} initial={false}>
              {/* Left Page */}
              <motion.div
                key={`left-${currentPage}`}
                custom={direction}
                variants={leftPageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-[#f8f9fa] border-r border-slate-300 shadow-[inset_-5px_0_10px_rgba(0,0,0,0.02)] overflow-hidden"
                style={{ ...linedPaperStyle, transformOrigin: 'right center', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-y-0 left-8 md:left-12 w-[1px] bg-red-400/50 pointer-events-none z-0" />
                <div className="absolute inset-0 p-8 md:p-16 pl-12 md:pl-20 z-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="h-full"
                  >
                    {getPageContent(currentPage, setSelectedImage)}
                  </motion.div>
                </div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-20" />
              </motion.div>

              {/* Right Page */}
              <motion.div
                key={`right-${currentPage}`}
                custom={direction}
                variants={rightPageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-1/2 h-full bg-[#f8f9fa] shadow-[inset_5px_0_10px_rgba(0,0,0,0.02)] overflow-hidden"
                style={{ ...linedPaperStyle, transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-y-0 left-8 md:left-12 w-[1px] bg-red-400/50 pointer-events-none z-0" />
                <div className="absolute inset-0 p-8 md:p-16 pl-12 md:pl-20 z-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="h-full"
                  >
                    {getPageContent(currentPage + 1, setSelectedImage)}
                  </motion.div>
                </div>
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-20" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-0 left-0 right-0 h-[10vh] flex items-center justify-center gap-2 md:gap-4 z-50">
        {Array.from({ length: TOTAL_PAGES / 2 }).map((_, i) => {
          const pageIndex = i * 2;
          return (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(pageIndex > currentPage ? 1 : -1);
                setCurrentPage(pageIndex);
              }}
              onMouseEnter={() => {
                setDirection(pageIndex > currentPage ? 1 : -1);
                setCurrentPage(pageIndex);
              }}
              className={`rounded-full transition-all duration-500 ${
                currentPage === pageIndex 
                  ? 'w-4 h-4 bg-white opacity-100 shadow-[0_0_20px_rgba(255,255,255,1)]' 
                  : 'w-1.5 h-1.5 bg-white opacity-40 hover:opacity-80 hover:scale-150'
              }`}
              aria-label={`Go to spread ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const ImageModal = ({ src, onClose }: { src: string, onClose: () => void }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: isZoomed ? 1.5 : 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`relative inline-block ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
        >
          <img 
            src={src} 
            alt="Fullscreen" 
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />
          {!isZoomed && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/80 opacity-80 hover:opacity-100 backdrop-blur-md transition-all duration-300 z-[110] shadow-lg border border-white/20"
            >
              <X size={16} className="text-white" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Info Bar */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full bg-[#111] border-t border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between text-gray-300 gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:w-1/4">
          <h3 className="text-xl font-serif text-white mb-2 uppercase tracking-widest">Project Details</h3>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm flex-1">
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Location</p>
            <p>Zurich, Switzerland</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Year</p>
            <p>2025</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Materials</p>
            <p>Exposed Concrete, Steel, Glass</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-500 uppercase tracking-wider text-xs mb-1">Description</p>
            <p className="leading-relaxed">A study in brutalist geometry and spatial dynamics. The interplay of light and shadow creates a sanctuary that defies the ephemeral nature of time.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
