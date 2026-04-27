import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { achievements } from '../lib/achievements';
import { playSound } from '../lib/sounds';

const NavigationHUD = ({ activeModule, setActiveModule }) => {
  const { state } = useGame();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const modules = [
    { id: 'about', label: 'WHOAMI' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'journey', label: 'SYS_LOGS' },
    { id: 'research', label: 'VAULT' },
    { id: 'wargames', label: 'WARGAMES' },
    { id: 'playlist', label: 'PLAYLIST' },
    { id: 'contact', label: 'COMMS' }
  ];

  const handleNav = (id) => {
    playSound('type');
    setActiveModule(id);
    setShowMobileMenu(false);
  };

  const unlockedCount = state.unlockedAchievements.length;
  const totalCount = achievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
        
        {/* Left: Logo/Status */}
        <div className="flex flex-col pointer-events-auto">
          <div className="text-white font-display font-bold text-2xl tracking-[0.2em] leading-none">
            S.PANDEY
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#39FF14]"></div>
            <div className="text-[10px] font-code text-white/50 tracking-widest">SYSTEM ONLINE // SECURE</div>
          </div>
        </div>

        {/* Center: Module Launcher (Desktop) */}
        <div className="hidden md:flex gap-2 pointer-events-auto cyber-glass rounded-full px-2 py-1">
          {modules.map(mod => (
            <button
              key={mod.id}
              onClick={() => handleNav(mod.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-code tracking-widest transition-all duration-300 ${
                activeModule === mod.id 
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>

        {/* Mobile: Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
            {showMobileMenu ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

        {/* Right: Gamification HUD */}
        <div className="flex flex-col items-end pointer-events-auto cursor-pointer group" onClick={() => setShowAchievements(true)}>
          <div className="text-[10px] font-code text-white/50 group-hover:text-green-400 transition-colors mb-1">
            ACHIEVEMENTS [ {unlockedCount}/{totalCount} ]
          </div>
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 transition-all duration-500 shadow-[0_0_8px_#39FF14]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl md:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-white font-display font-bold text-xl tracking-widest">MENU</div>
              <button onClick={() => setShowMobileMenu(false)} className="text-white/50 font-code text-sm">CLOSE [X]</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {modules.map((mod, i) => (
                <motion.button
                  key={mod.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(mod.id)}
                  className={`w-full text-left py-4 border-b border-white/5 font-code tracking-[0.2em] transition-all ${
                    activeModule === mod.id ? 'text-cyan-400 pl-4 border-cyan-400/30' : 'text-white/60'
                  }`}
                >
                  {mod.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Modal overlay */}
      {showAchievements && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="cyber-glass border-white/20 rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h2 className="text-xl font-display text-white tracking-widest">DECRYPTED_ACHIEVEMENTS</h2>
              <button onClick={() => setShowAchievements(false)} className="text-white/50 hover:text-white font-code text-sm">CLOSE [X]</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {achievements.map(a => {
                const isUnlocked = state.unlockedAchievements.includes(a.id);
                return (
                  <div key={a.id} className={`p-4 rounded-md border ${isUnlocked ? 'border-green-400/50 bg-green-400/5' : 'border-white/5 bg-white/5'} flex items-start gap-4 transition-all`}>
                    <div className={`text-2xl ${isUnlocked ? 'drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]' : 'opacity-20 grayscale'}`}>
                      {a.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold font-code text-xs mb-1 ${isUnlocked ? 'text-green-400' : 'text-white/30'}`}>
                        {a.name}
                      </h4>
                      <p className="text-[10px] text-white/50 font-code leading-relaxed">{a.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationHUD;
