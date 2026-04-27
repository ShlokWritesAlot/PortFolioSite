import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MatrixRain from '../components/shared/MatrixRain';
import NavigationHUD from '../components/NavigationHUD';
import CyberTerminal from '../components/CyberTerminal';

// Import modules
import About from '../components/About';
import Projects from '../components/Projects';
import Journey from '../components/Journey';
import Research from '../components/Research';
import Contact from '../components/Contact';
import CTF from '../components/CTF';
import MusicPlayer from '../components/MusicPlayer';

const Home = () => {
  const [activeModule, setActiveModule] = useState(null); // null = desktop/boot
  const [loading, setLoading] = useState(true);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Automatically open "About" after boot
      setTimeout(() => setActiveModule('about'), 1000);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'about': return <About />;
      case 'projects': return <Projects />;
      case 'journey': return <Journey />;
      case 'research': return <Research />;
      case 'wargames': return <CTF />;
      case 'playlist': return <MusicPlayer />;
      case 'contact': return <Contact />;
      default: return null;
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-body text-white">
      {/* Matrix Background - Disabled for 3D Game to save performance */}
      {activeModule !== 'playlist' && <MatrixRain />}
      <div className="vignette"></div>
      <div className="crt-overlay"></div>

      {loading ? (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black font-code">
          <div className="text-cyan-400 text-sm mb-4 glitch" data-text="INITIALIZING CYBERDECK OS v3.0...">
            INITIALIZING CYBERDECK OS v3.0...
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-cyan-400 shadow-[0_0_10px_#00E5FF]"
            />
          </div>
        </div>
      ) : (
        <>
          {/* UI Layer */}
          <NavigationHUD activeModule={activeModule} setActiveModule={setActiveModule} />
          
          {/* Main Central Viewport */}
          <main className="absolute inset-0 pt-24 pb-20 px-4 md:px-12 flex justify-center items-center pointer-events-none z-10">
            <AnimatePresence mode="wait">
              {!activeModule && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex flex-col items-center justify-center font-display relative"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>
                  
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-[0.2em] mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-[pulse_4s_ease-in-out_infinite] relative">
                    <span className="absolute -inset-1 bg-cyan-400 blur-3xl opacity-10 rounded-full animate-pulse"></span>
                    S.PANDEY
                  </h1>
                  
                  <div className="font-code text-xs md:text-sm tracking-[0.5em] text-cyan-400/80 border border-cyan-400/30 px-6 py-2 rounded bg-cyan-400/5 shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                    CYBERDECK // OS_ONLINE // AWAITING_INPUT
                  </div>
                </motion.div>
              )}
              {activeModule && (
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-6xl h-full max-h-[80vh] cyber-glass rounded-xl border border-white/10 overflow-hidden flex flex-col pointer-events-auto relative"
                >
                  {/* Module Header */}
                  <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex items-center justify-between shrink-0">
                    <div className="font-code text-xs text-white/50 tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 bg-white/30 rounded-full"></span>
                      MODULE // {activeModule.toUpperCase()}.EXE
                    </div>
                    <button 
                      onClick={() => setActiveModule(null)}
                      className="text-white/30 hover:text-white transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>

                  {/* Module Content Area - This scrolls internally */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 relative">
                    {renderModule()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Persistent Widget Layer */}
          <CyberTerminal setActiveModule={setActiveModule} />
        </>
      )}
    </div>
  );
};

export default Home;
